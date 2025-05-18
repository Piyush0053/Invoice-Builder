import { v4 as uuidv4 } from 'uuid';
import { format } from 'date-fns';
import { Invoice, Company, Client } from '../types';

export const sampleCompany: Company = {
  name: 'Acme Corporation',
  address: '123 Business Avenue',
  city: 'San Francisco',
  state: 'CA',
  zipCode: '94107',
  country: 'United States',
  phone: '+1 (555) 123-4567',
  email: 'billing@acmecorp.com',
  website: 'www.acmecorp.com',
  taxId: 'US123456789',
  logo: 'https://images.pexels.com/photos/15031644/pexels-photo-15031644/free-photo-of-letter-a-logo.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
};

export const sampleClient: Client = {
  name: 'Globex Industries',
  address: '456 Client Street',
  city: 'New York',
  state: 'NY',
  zipCode: '10001',
  country: 'United States',
  phone: '+1 (555) 987-6543',
  email: 'accounts@globex.com',
  taxId: 'US987654321'
};

export const createSampleInvoice = (): Invoice => {
  const today = new Date();
  const dueDate = new Date();
  dueDate.setDate(today.getDate() + 30);
  
  return {
    id: uuidv4(),
    invoiceNumber: `INV-${Math.floor(10000 + Math.random() * 90000)}`,
    date: format(today, 'yyyy-MM-dd'),
    dueDate: format(dueDate, 'yyyy-MM-dd'),
    company: sampleCompany,
    client: sampleClient,
    items: [
      {
        id: uuidv4(),
        description: 'Web Design Services',
        quantity: 1,
        unitPrice: 1200,
        taxRate: 8.5,
        discount: 0,
        discountType: 'percentage',
        total: 1200
      },
      {
        id: uuidv4(),
        description: 'Logo Design',
        quantity: 1,
        unitPrice: 450,
        taxRate: 8.5,
        discount: 50,
        discountType: 'fixed',
        total: 400
      },
      {
        id: uuidv4(),
        description: 'Hosting (Annual)',
        quantity: 1,
        unitPrice: 240,
        taxRate: 0,
        discount: 10,
        discountType: 'percentage',
        total: 216
      }
    ],
    notes: 'Thank you for your business!',
    terms: 'Payment due within 30 days. Late payments subject to a 1.5% monthly fee.',
    subtotal: 1816,
    taxTotal: 136,
    discountTotal: 74,
    total: 1952,
    currency: 'USD',
    status: 'draft',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
};