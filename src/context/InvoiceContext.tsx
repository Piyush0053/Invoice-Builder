import React, { createContext, useContext, useState, useRef, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { Invoice, InvoiceItem, InvoiceStatus, Company, Client } from '../types';
import { generatePdf } from '../utils/pdfGenerator';
import { recalculateInvoice } from '../utils/calculations';
import { sampleCompany, sampleClient, createSampleInvoice } from '../data/sampleData';

type EmailResult = {
  success: boolean;
  error?: string;
};

type EmailOptions = {
  to: string;
  subject: string;
  message: string;
  attachmentBlob?: Blob;
  attachmentName?: string;
};

// Simulated email service function
const sendInvoiceEmail = async (options: EmailOptions): Promise<EmailResult> => {
  try {
    // In a real application, this would connect to a backend API to send the email
    // For this example, we'll just simulate a successful email
    console.log(`Sending email to: ${options.to}`);
    console.log(`Subject: ${options.subject}`);
    console.log(`Message: ${options.message}`);
    
    if (options.attachmentBlob) {
      console.log('Attachment size:', Math.round(options.attachmentBlob.size / 1024), 'KB');
      console.log('Attachment name:', options.attachmentName || 'invoice.pdf');
    }
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    return { success: true };
  } catch (error) {
    console.error('Error in sendInvoiceEmail:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
};

interface InvoiceContextType {
  currentInvoice: Invoice;
  setInvoice: (invoice: Invoice) => void;
  updateCompany: (company: Company) => void;
  updateClient: (client: Client) => void;
  addItem: () => void;
  updateItem: (id: string, item: Partial<InvoiceItem>) => void;
  removeItem: (id: string) => void;
  updateInvoiceField: <K extends keyof Invoice>(field: K, value: Invoice[K]) => void;
  resetInvoice: () => void;
  createNewInvoice: () => void;
  previewInvoice: () => Promise<void>;
  sendInvoice: (email: string, subject?: string, message?: string, pdfBlob?: Blob) => Promise<EmailResult>;
  invoicePdfRef: React.RefObject<HTMLDivElement>;
  isPreviewMode: boolean;
  togglePreviewMode: () => void;
  generateInvoicePdf: () => Promise<Blob | null>;
  calculateTotals: (items: InvoiceItem[]) => { subtotal: number; tax: number; total: number };
}

const InvoiceContext = createContext<InvoiceContextType | undefined>(undefined);

export const InvoiceProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentInvoice, setCurrentInvoice] = useState<Invoice>({
    id: uuidv4(),
    invoiceNumber: `INV-${Math.floor(1000 + Math.random() * 9000)}`,
    date: new Date().toISOString().split('T')[0],
    dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    from: 'Your Company Name',
    to: 'Client Name',
    toEmail: 'client@example.com',
    items: [
      {
        id: uuidv4(),
        description: 'Service 1',
        quantity: 1,
        price: 100,
        amount: 100,
      },
    ],
    subtotal: 100,
    taxRate: 18, // Default tax rate
    tax: 18,
    total: 118,
    notes: 'Thank you for your business!',
    terms: 'Payment due within 30 days',
    status: 'draft',
    currency: 'USD',
    paymentMethod: 'Bank Transfer',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });
  const invoicePdfRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const [isPreviewMode, setIsPreviewMode] = useState(false);

  const setInvoice = (invoice: Invoice) => {
    setCurrentInvoice(invoice);
  };

  const updateCompany = (company: Company) => {
    setCurrentInvoice(prev => ({
      ...prev,
      company,
      updatedAt: new Date().toISOString(),
    }));
  };

  const updateClient = (client: Client) => {
    setCurrentInvoice(prev => ({
      ...prev,
      client,
      updatedAt: new Date().toISOString(),
    }));
  };

  const addItem = () => {
    const newItem: InvoiceItem = {
      id: uuidv4(),
      description: 'New Item',
      quantity: 1,
      price: 0,
      amount: 0,
    };

    setCurrentInvoice(prev => ({
      ...prev,
      items: [...prev.items, newItem],
      updatedAt: new Date().toISOString(),
    }));
  };

  const updateItem = (id: string, itemUpdates: Partial<InvoiceItem>) => {
    setCurrentInvoice(prev => {
      const updatedItems = prev.items.map(item =>
        item.id === id ? { ...item, ...itemUpdates } : item
      );
      const updatedInvoice = {
        ...prev,
        items: updatedItems,
        updatedAt: new Date().toISOString(),
      };
      return recalculateInvoice(updatedInvoice);
    });
  };

  const removeItem = (id: string) => {
    setCurrentInvoice(prev => {
      const updatedInvoice = {
        ...prev,
        items: prev.items.filter(item => item.id !== id),
        updatedAt: new Date().toISOString(),
      };
      return recalculateInvoice(updatedInvoice);
    });
  };

  const updateInvoiceField = <K extends keyof Invoice>(field: K, value: Invoice[K]) => {
    setCurrentInvoice(prev => {
      const updatedInvoice = {
        ...prev,
        [field]: value,
        updatedAt: new Date().toISOString(),
      } as Invoice;
      return field === 'items' ? recalculateInvoice(updatedInvoice) : updatedInvoice;
    });
  };

  const resetInvoice = () => {
    setCurrentInvoice(createSampleInvoice());
  };

  const createNewInvoice = () => {
    const today = new Date();
    const dueDate = new Date();
    dueDate.setDate(today.getDate() + 30);

    const newInvoice: Invoice = {
      id: uuidv4(),
      invoiceNumber: `INV-${Math.floor(10000 + Math.random() * 90000)}`,
      date: new Date().toISOString().split('T')[0],
      dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      from: typeof sampleCompany === 'object' ? sampleCompany.name : 'Your Company',
      to: typeof sampleClient === 'object' ? sampleClient.name : 'Client Name',
      toEmail: typeof sampleClient === 'object' ? sampleClient.email || '' : '',
      company: sampleCompany,
      client: sampleClient,
      items: [],
      notes: '',
      terms: 'Payment due within 30 days.',
      subtotal: 0,
      taxRate: 0,
      tax: 0,
      discount: 0,
      total: 0,
      currency: 'USD',
      status: 'draft' as InvoiceStatus,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setCurrentInvoice(newInvoice);
  };

  const previewInvoice = async () => {
    navigate('/preview');
    // The actual PDF generation will be handled in the Preview component
  };

  const sendInvoice = async (
    email: string, 
    subject?: string, 
    message?: string, 
    providedPdfBlob?: Blob
  ): Promise<EmailResult> => {
    try {
      if (!email) {
        throw new Error('Email is required');
      }

      // Use provided PDF blob or generate a new one
      const pdfBlob = providedPdfBlob || await generateInvoicePdf();
      if (!pdfBlob) {
        throw new Error('Failed to generate PDF');
      }

      // Prepare email options
      const emailOptions: EmailOptions = {
        to: email,
        subject: subject || `Invoice #${currentInvoice.invoiceNumber}`,
        message: message || 'Please find attached your invoice. Thank you for your business!',
        attachmentBlob: pdfBlob,
        attachmentName: `invoice-${currentInvoice.invoiceNumber}.pdf`
      };

      // Send email with PDF attachment
      const result = await sendInvoiceEmail(emailOptions);

      // Update invoice status to sent if email was sent successfully
      if (result.success) {
        setCurrentInvoice(prev => ({
          ...prev,
          status: 'sent',
          sentAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }));
      }

      return result;
    } catch (error) {
      console.error('Error sending invoice:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to send invoice'
      };
    }
  };

  const calculateTotals = (items: InvoiceItem[]) => {
    const subtotal = items.reduce((sum, item) => sum + (item.quantity * item.price), 0);
    const tax = subtotal * (currentInvoice.taxRate / 100);
    const total = subtotal + tax;

    const updatedItems = items.map(item => ({
      ...item,
      amount: item.quantity * item.price
    }));

    setCurrentInvoice(prev => ({
      ...prev,
      items: updatedItems,
      subtotal,
      tax,
      total,
      updatedAt: new Date().toISOString()
    }));

    return { subtotal, tax, total };
  };

  const generateInvoicePdf = async (): Promise<Blob | null> => {
    if (!invoicePdfRef.current) {
      console.error('Invoice PDF ref is not available');
      return null;
    }

    try {
      const pdfBlob = await generatePdf(invoicePdfRef.current);
      return pdfBlob;
    } catch (error) {
      console.error('Error generating PDF:', error);
      return null;
    }
  };

  const togglePreviewMode = () => {
    setIsPreviewMode(!isPreviewMode);
  };

  return (
    <InvoiceContext.Provider
      value={{
        currentInvoice,
        setInvoice,
        updateCompany,
        updateClient,
        addItem,
        updateItem,
        removeItem,
        updateInvoiceField,
        resetInvoice,
        createNewInvoice,
        previewInvoice,
        sendInvoice,
        invoicePdfRef,
        isPreviewMode,
        togglePreviewMode,
        generateInvoicePdf,
        calculateTotals,
      }}
    >
      {children}
    </InvoiceContext.Provider>
  );
};

export const useInvoice = (): InvoiceContextType => {
  const context = useContext(InvoiceContext);
  if (context === undefined) {
    throw new Error('useInvoice must be used within an InvoiceProvider');
  }
  return context;
};
