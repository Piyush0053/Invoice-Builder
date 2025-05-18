export interface Company {
  name: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone: string;
  email: string;
  website: string;
  taxId: string;
  logo?: string;
}

export interface Client {
  name: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone: string;
  email: string;
  taxId: string;
}

export type InvoiceStatus = 'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled';

export interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  price: number;
  amount: number;
  unitPrice?: number; // Alias for price for backward compatibility
  taxRate?: number;
  discount?: number;
  discountType?: 'percentage' | 'fixed';
  note?: string;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  date: string;
  dueDate: string;
  from: string;
  to: string;
  toEmail: string;
  items: InvoiceItem[];
  notes: string;
  terms: string;
  subtotal: number;
  taxRate: number;
  tax: number;
  taxTotal?: number; // Alias for tax for backward compatibility
  discount?: number;
  discountTotal?: number; // Alias for discount for backward compatibility
  total: number;
  currency: string;
  status: InvoiceStatus;
  paymentMethod?: string;
  paymentReference?: string;
  userId?: string;
  createdAt: string;
  updatedAt: string;
  sentAt?: string;
  paidAt?: string;
  // For backward compatibility
  company?: Company | string;
  client?: Client | string;
}

export interface InvoiceTemplate {
  id: string;
  name: string;
  previewImage: string;
  primaryColor: string;
  secondaryColor: string;
  fontFamily: string;
  layout: 'standard' | 'modern' | 'minimal' | 'professional' | 'creative';
}

export type CurrencyCode = 'USD' | 'EUR' | 'GBP' | 'CAD' | 'AUD' | 'JPY' | 'CNY' | 'INR';

export interface CurrencyInfo {
  code: CurrencyCode;
  symbol: string;
  name: string;
  symbolPosition: 'before' | 'after';
  decimalSeparator: string;
  thousandsSeparator: string;
  decimalPlaces: number;
}