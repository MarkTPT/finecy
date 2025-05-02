import type Invoice from './Invoice';

type InvoiceInfoExtractorPayload = {
  invoiceData: Invoice;
  storageData: { id: string; path: string; fullPath: string };
};

export default InvoiceInfoExtractorPayload;
