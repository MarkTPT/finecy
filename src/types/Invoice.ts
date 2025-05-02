import type Category from '@/enums/Category';

export type Seller = {
  name?: string;
  registration_number?: string;
  vat_number?: string;
  address?: string;
  phone?: string;
  email?: string;
  website?: string;
  store?: string;
};

export type Item = {
  title?: string;
  quantity?: number;
  unit_type?: string;
  unit_price?: number;
  total_price?: number;
  discount?: number;
};

export type CategoryGroup = {
  name: Category;
  items: Item[];
};

export type Discount = {
  description?: string;
  amount?: number;
};

export type Payment = {
  method?: string;
  card_type?: string;
  masked_pan?: string;
};

type Invoice = {
  invoice_number?: string;
  invoice_date?: string;
  invoice_time?: string;
  seller?: Seller;
  categories?: CategoryGroup[];
  discounts?: Discount[];
  total?: number;
  currency?: string;
  payment?: Payment;
};

export default Invoice;
