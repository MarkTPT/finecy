import 'jsr:@supabase/functions-js/edge-runtime.d.ts';
import { OpenAI } from 'npm:openai@4.8.0';
import { createClient } from 'jsr:@supabase/supabase-js@2';
import { randomUUID } from 'node:crypto';
import { Buffer } from 'node:buffer';

// This function cleans the extracted JSON string by removing unnecessary characters
// and formatting it to ensure valid JSON syntax.
function cleanExtractedJson(raw: string) {
  return raw
    .replace(/^```json\s*/i, '') // Remove starting ```json (case insensitive)
    .replace(/^```\s*/i, '') // Remove starting ``` (if no json tag)
    .replace(/\s*```$/i, '') // Remove ending ```
    .trim(); // Trim any leading/trailing spaces
}

// MIME type of the image (currently hardcoded to webp as react native code does)
const contentType = 'image/webp';

// Prompt for OpenAI
// This prompt is used to instruct the OpenAI model on how to process the invoice image
// and what fields to extract from it.
const prompt = `You are an invoice processing assistant. \
Extract the following fields from the provided invoice image and return them in valid JSON format: \
invoice_number, invoice_date, invoice_time, seller (an object with: name, registration_number, vat_number, address, phone, email, website, store), categories (a list of objects with: name, items). \
Each category object must have: \
- "name" (one of: food, transport, other, health, shopping, leisure) \
- "items" (a list of objects with: title, quantity, unit_type, unit_price, total_price, discount) \
The "unit_type" field specifies the measurement unit (e.g., "kg", "tk", etc.). \
Group the extracted items under the correct category. If you cannot confidently assign an item to a category, group it under the "other" category. \
Also extract: discounts (a list of objects with: description, amount), total, currency, and payment (an object with: method, card_type, masked_pan). \
All numeric fields (quantity, unit_price, total_price, discount.amount, total) must be returned as numbers, not strings. \
The "currency" field must always be returned as a valid ISO 4217 currency code (e.g., "EUR"). \
The "invoice_date" must be returned in the DD.MM.YYYY format. \
If a field cannot be confidently extracted or is missing, omit the entire key from the JSON output. \
Do not include empty strings, null values, or placeholders. \
Return only the raw JSON without any markdown, code fences, explanations, or extra text.`;

// This function is deployed as a Deno Edge Function
// and is triggered by a POST request with a base64 encoded webp image in the body.
// The function uses OpenAI's GPT-4.1 model to extract invoice data from the image.
// The extracted data is then uploaded to Supabase storage.
// The function returns the extracted data and the storage response.
// The function handles errors and returns appropriate error messages.
Deno.serve(async (req) => {
  try {
    // Create a Supabase client
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
    );

    // Create an OpenAI client
    const openai = new OpenAI({
      apiKey: Deno.env.get('OPENAI_API_KEY'),
    });

    // Get the image data from the request body
    const base64 = await req.text();

    // If the request body is empty, return an error
    if (!base64) {
      return new Response(JSON.stringify({ error: 'No file provided' }), {
        status: 400,
      });
    }

    // Ask OpenAI to extract data from the image
    const visionResponse = await openai.chat.completions.create({
      model: 'gpt-4.1-mini',
      messages: [
        { role: 'system', content: prompt },
        {
          role: 'user',
          content: [
            {
              type: 'image_url',
              image_url: {
                url: `data:${contentType};base64,${base64}`,
              },
            },
          ],
        },
      ],
    });

    // Check the response from OpenAI
    const extractedJsonRaw =
      visionResponse.choices?.[0]?.message?.content ?? null;

    // If the response is empty or null, return an error
    if (!extractedJsonRaw) {
      return new Response(
        JSON.stringify({
          error: 'Failed to extract data from invoice',
        }),
        {
          status: 500,
        },
      );
    }

    // Clean response before parsing
    const cleanedJsonString = cleanExtractedJson(extractedJsonRaw);

    // Validate JSON syntax
    let extractedJson;
    try {
      extractedJson = JSON.parse(cleanedJsonString);
    } catch (parseError) {
      console.error('JSON parse error:', parseError);

      return new Response(
        JSON.stringify({
          error: 'Invalid JSON format returned from vision model',
        }),
        {
          status: 500,
        },
      );
    }

    // Check if the extracted JSON is empty
    if (Object.keys(extractedJson).length === 0) {
      return new Response(
        JSON.stringify({
          error: 'No data extracted from invoice',
        }),
        {
          status: 400,
        },
      );
    }

    // Generate a unique file name for the image
    // using a random UUID and the content type of the image
    const fileName = `${randomUUID()}.${contentType.split('/')[1]}`;

    // Create a Blob from the base64 string
    const fileBlob = new Blob([Buffer.from(base64, 'base64')], {
      type: contentType,
    });

    // Upload the image to Supabase storage
    // and attach the extracted JSON as metadata
    const { data: storageData, error: storageError } = await supabase.storage
      .from('invoices')
      .upload(fileName, fileBlob, {
        metadata: {
          extracted_json: JSON.stringify(extractedJson),
        },
      });

    // Check for errors during the upload
    if (storageError) {
      console.error('Storage upload error:', storageError);

      return new Response(
        JSON.stringify({
          error: 'Failed to upload file to storage',
        }),
        {
          status: 500,
        },
      );
    }

    // Return the extracted JSON and storage data
    return new Response(
      JSON.stringify({
        invoiceData: extractedJson,
        storageData: storageData,
      }),
      {
        headers: { 'Content-Type': 'application/json' },
      },
    );
  } catch (err) {
    console.error('Unhandled error:', err);

    return new Response(
      JSON.stringify({
        error: 'Internal server error',
      }),
      {
        status: 500,
      },
    );
  }
});
