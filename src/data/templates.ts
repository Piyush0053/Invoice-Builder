import { InvoiceTemplate } from '../types';

export const invoiceTemplates: InvoiceTemplate[] = [
  {
    id: 'standard',
    name: 'Standard',
    previewImage: 'https://images.pexels.com/photos/6694543/pexels-photo-6694543.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    primaryColor: '#4f46e5',
    secondaryColor: '#1e293b',
    fontFamily: 'Inter, sans-serif',
    layout: 'standard'
  },
  {
    id: 'modern',
    name: 'Modern',
    previewImage: 'https://images.pexels.com/photos/6693661/pexels-photo-6693661.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    primaryColor: '#0ea5e9',
    secondaryColor: '#0f172a',
    fontFamily: 'Poppins, sans-serif',
    layout: 'modern'
  },
  {
    id: 'minimal',
    name: 'Minimal',
    previewImage: 'https://images.pexels.com/photos/6693645/pexels-photo-6693645.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    primaryColor: '#64748b',
    secondaryColor: '#334155',
    fontFamily: 'Inter, sans-serif',
    layout: 'minimal'
  },
  {
    id: 'professional',
    name: 'Professional',
    previewImage: 'https://images.pexels.com/photos/6693651/pexels-photo-6693651.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    primaryColor: '#0f766e',
    secondaryColor: '#134e4a',
    fontFamily: 'Poppins, sans-serif',
    layout: 'professional'
  },
  {
    id: 'creative',
    name: 'Creative',
    previewImage: 'https://images.pexels.com/photos/6693654/pexels-photo-6693654.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    primaryColor: '#c026d3',
    secondaryColor: '#701a75',
    fontFamily: 'Poppins, sans-serif',
    layout: 'creative'
  }
];