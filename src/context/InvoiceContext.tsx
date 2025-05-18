import React, { createContext, useContext, useState, ReactNode } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { format } from 'date-fns';
import { Invoice, InvoiceItem, Company, Client } from '../types';
import { recalculateInvoice } from '../utils/calculations';
import { sampleCompany, sampleClient, createSampleInvoice } from '../data/sampleData';

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
}

const InvoiceContext = createContext<InvoiceContextType | undefined>(undefined);

export const InvoiceProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentInvoice, setCurrentInvoice] = useState<Invoice>(createSampleInvoice());

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
      description: '',
      quantity: 1,
      unitPrice: 0,
      taxRate: 0,
      discount: 0,
      discountType: 'percentage',
      total: 0,
    };

    setCurrentInvoice(prev => {
      const updatedInvoice = {
        ...prev,
        items: [...prev.items, newItem],
        updatedAt: new Date().toISOString(),
      };
      return recalculateInvoice(updatedInvoice);
    });
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
      date: format(today, 'yyyy-MM-dd'),
      dueDate: format(dueDate, 'yyyy-MM-dd'),
      company: sampleCompany,
      client: sampleClient,
      items: [],
      notes: '',
      terms: 'Payment due within 30 days.',
      subtotal: 0,
      taxTotal: 0,
      discountTotal: 0,
      total: 0,
      currency: 'USD',
      status: 'draft',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setCurrentInvoice(newInvoice);
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
