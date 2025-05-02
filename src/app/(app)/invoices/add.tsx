import { storage } from '@/lib/storage';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/providers/AuthProvider';
import IconSize from '@/svg/enums/IconSize';
import CalendarIcon from '@/svg/icons/CalendarIcon';
import CloseIcon from '@/svg/icons/CloseIcon';
import EurCurrencyIcon from '@/svg/icons/EurCurrencyIcon';
import NoteIcon from '@/svg/icons/NoteIcon';
import BodyText from '@/components/BodyText';
import { router } from 'expo-router';
import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  Modal,
  Pressable,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import DateTimePicker, { useDefaultStyles } from 'react-native-ui-datepicker';
import { Toast } from 'toastify-react-native';
import type Invoice from '@/types/Invoice';
import type InvoiceInfoExtractorPayload from '@/types/InvoiceInfoExtractorPayload';
import CategoryItem from '@/components/CategoryItem';
import Fonts from '@/constants/Fonts';

type Transaction = Invoice & {
  name?: string;
  note?: string;
  invoice_image_path?: string;
};

const formatInvoiceDateAndTimeToDateObject = (
  invoice_date: string,
  invoice_time: string,
) => {
  // invoice_date is in format DD.MM.YYYY
  const [day, month, year] = invoice_date.split('.');

  const isoString = `${year}-${month}-${day}T${invoice_time}`;

  return new Date(isoString);
};

export default function AddInvoicePage() {
  const insets = useSafeAreaInsets();

  const detectedPayload = storage.getObject<InvoiceInfoExtractorPayload>(
    'detectedInvoicePayload',
  );

  const [invoice, setInvoice] = useState<Transaction>({
    ...detectedPayload?.invoiceData,

    seller: {
      ...detectedPayload?.invoiceData.seller,
      name: detectedPayload?.invoiceData.seller?.name || '',
    },

    total: detectedPayload?.invoiceData.total || 0,
    currency: detectedPayload?.invoiceData.currency || 'EUR',

    name:
      detectedPayload?.invoiceData.seller?.name ||
      `Invoice #${detectedPayload?.invoiceData.invoice_number || '123'}`,

    invoice_date:
      detectedPayload?.invoiceData.invoice_date ||
      new Date().toLocaleDateString(),
    invoice_time:
      detectedPayload?.invoiceData.invoice_time ||
      new Date().getTime().toString(),

    note: '',

    invoice_image_path: detectedPayload?.storageData.path,
  });

  const [saving, setSaving] = useState(false);

  const [datePickerVisible, setDatePickerVisible] = useState(false);

  const datetimePickerDefaultStyles = useDefaultStyles('dark');

  const { profile } = useAuth();

  return (
    <View
      style={{
        backgroundColor: '#1B2128',
        flex: 1,
        paddingTop: insets.top,
      }}
    >
      <View style={styles.header}>
        <Pressable
          style={{ padding: 4 }}
          onPress={() => {
            if (router.canGoBack()) {
              router.back();
            } else {
              router.replace('/(app)/(tabs)/scanInvoice');
            }
          }}
          disabled={saving}
        >
          <CloseIcon size={IconSize.MD} />
        </Pressable>

        <Pressable
          style={styles.saveBtn}
          disabled={saving}
          onPress={() => {
            console.log('Save invoice', invoice);

            setSaving(true);

            supabase
              .from('invoices')
              .insert({
                user_id: profile?.id,
                name: invoice.name as string,
                note: invoice.note,
                date_time: formatInvoiceDateAndTimeToDateObject(
                  invoice.invoice_date!,
                  invoice.invoice_time!,
                ).toISOString(),
                categories: invoice.categories,
                picture_id: detectedPayload?.storageData.id,
                original_data: detectedPayload?.invoiceData,
              })
              .then(({ error }) => {
                setSaving(false);

                if (error) {
                  console.error('Error saving invoice', error);

                  Toast.show({
                    type: 'error',
                    text1: 'Error saving invoice',
                    text2: error.message,
                  });
                } else {
                  console.log('Invoice saved successfully');

                  Toast.show({
                    type: 'success',
                    text1: 'Invoice saved successfully',
                  });

                  router.replace('/(app)/(tabs)');
                }
              });
          }}
        >
          <Text style={{ color: '#1B2128' }}>Save</Text>
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: insets.bottom }}>
        <View style={styles.fieldContainer}>
          <TextInput
            value={invoice.name}
            onChangeText={(text) => setInvoice({ ...invoice, name: text })}
            style={styles.fieldInput}
            placeholder="Invoice Name"
            placeholderTextColor="#666F76"
            readOnly={saving}
          />
        </View>

        <View style={styles.fieldContainer}>
          <TextInput
            readOnly
            value={invoice.total?.toString()}
            style={styles.fieldInput}
            keyboardType="numeric"
            placeholder="Total Amount"
            placeholderTextColor="#666F76"
          />

          <EurCurrencyIcon size={IconSize.MD} color="#9BA2AA" />
        </View>

        <View style={styles.fieldContainer}>
          <Pressable
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 16,

              minWidth: '100%',
              height: '100%',
            }}
            disabled={saving}
            onPress={() => setDatePickerVisible(true)}
          >
            <CalendarIcon size={IconSize.MD} color="#D0D5DD" />

            <BodyText
              style={{
                color: '#D0D5DD',
                fontFamily: Fonts.Inter700,
                fontSize: 16,
              }}
            >
              {invoice.invoice_date} {invoice.invoice_time?.slice(0, 5)}
            </BodyText>
          </Pressable>
        </View>

        <View
          style={{
            borderBottomWidth: 1,
            borderBottomColor: '#343B42',

            paddingVertical: 8,
          }}
        >
          {invoice.categories?.map((category, index) => (
            <CategoryItem
              key={index}
              name={category.name}
              items={category.items}
            />
          ))}
        </View>

        <View
          style={[
            styles.fieldContainer,
            { height: undefined, paddingVertical: 8 },
          ]}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 16,
            }}
          >
            <NoteIcon size={IconSize.MD} color="#D0D5DD" />

            <TextInput
              value={invoice.note}
              onChangeText={(text) => setInvoice({ ...invoice, note: text })}
              style={[styles.fieldInput]}
              placeholder="Add note"
              placeholderTextColor="#666F76"
              multiline
              readOnly={saving}
            />
          </View>
        </View>
      </ScrollView>

      {datePickerVisible && (
        <Modal
          animationType="slide"
          transparent
          visible
          onRequestClose={() => setDatePickerVisible(false)}
        >
          <View
            style={{
              flex: 1,
              backgroundColor: `${'#1B2128'}AA`,
              padding: 16,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onStartShouldSetResponder={() => {
              setDatePickerVisible(false);
              return true;
            }}
          >
            <DateTimePicker
              mode="single"
              calendar="gregory"
              date={formatInvoiceDateAndTimeToDateObject(
                invoice.invoice_date!,
                invoice.invoice_time!,
              )}
              timePicker
              containerHeight={300}
              style={{
                backgroundColor: `${'#01060D'}`,
                borderRadius: 16,
                paddingHorizontal: 16,
                paddingTop: 16,
              }}
              styles={{
                ...datetimePickerDefaultStyles,
                today: { backgroundColor: '#1B2128' },
                selected: { backgroundColor: '#0D6EFD' },
                selected_label: { color: 'white' },
              }}
              onChange={({ date }) => {
                setDatePickerVisible(false);

                const d = new Date(date as string);

                const formattedDate = d.toLocaleDateString('et-EE', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric',
                });

                const formattedTime = d.toLocaleTimeString('et-EE', {
                  hour: '2-digit',
                  minute: '2-digit',
                });

                setInvoice((prev) => ({
                  ...prev,
                  invoice_date: formattedDate,
                  invoice_time: formattedTime,
                }));
              }}
            />
          </View>
        </Modal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    padding: 16,

    backgroundColor: '#1B2128',

    borderBottomWidth: 1,
    borderBottomColor: '#343B42',

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  saveBtn: {
    backgroundColor: '#5AA4FE',
    borderRadius: 8,

    paddingVertical: 12,
    paddingHorizontal: 20,
  },

  fieldContainer: {
    paddingHorizontal: 24,
    height: 60,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 16,

    borderBottomWidth: 1,
    borderBottomColor: '#343B42',
  },
  fieldInput: {
    paddingVertical: 8,
    flex: 1,

    fontFamily: Fonts.Inter700,
    fontSize: 18,

    color: '#D0D5DD',
  },
});
