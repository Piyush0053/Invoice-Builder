import { InvoiceItem, Invoice } from '../types';

export const calculateItemTotal = (item: InvoiceItem): number => {
  const subtotal = item.quantity * item.unitPrice;
  
  // Apply discount
  let discountAmount = 0;
  if (item.discount > 0) {
    if (item.discountType === 'percentage') {
      discountAmount = subtotal * (item.discount / 100);
    } else {
      discountAmount = item.discount;
    }
  }
  
  const afterDiscount = subtotal - discountAmount;
  
  // Apply tax
  const taxAmount = afterDiscount * (item.taxRate / 100);
  
  return afterDiscount + taxAmount;
};

export const recalculateInvoice = (invoice: Invoice): Invoice => {
  // Recalculate each item's total
  const updatedItems = invoice.items.map(item => ({
    ...item,
    total: calculateItemTotal(item)
  }));
  
  // Calculate subtotal (before tax and after item-level discounts)
  const subtotal = updatedItems.reduce((sum, item) => {
    const itemSubtotal = item.quantity * item.unitPrice;
    let discountAmount = 0;
    
    if (item.discount > 0) {
      if (item.discountType === 'percentage') {
        discountAmount = itemSubtotal * (item.discount / 100);
      } else {
        discountAmount = item.discount;
      }
    }
    
    return sum + (itemSubtotal - discountAmount);
  }, 0);
  
  // Calculate total tax
  const taxTotal = updatedItems.reduce((sum, item) => {
    const itemSubtotal = item.quantity * item.unitPrice;
    let discountAmount = 0;
    
    if (item.discount > 0) {
      if (item.discountType === 'percentage') {
        discountAmount = itemSubtotal * (item.discount / 100);
      } else {
        discountAmount = item.discount;
      }
    }
    
    const afterDiscount = itemSubtotal - discountAmount;
    const itemTax = afterDiscount * (item.taxRate / 100);
    
    return sum + itemTax;
  }, 0);
  
  // Calculate total discount
  const discountTotal = updatedItems.reduce((sum, item) => {
    const itemSubtotal = item.quantity * item.unitPrice;
    let discountAmount = 0;
    
    if (item.discount > 0) {
      if (item.discountType === 'percentage') {
        discountAmount = itemSubtotal * (item.discount / 100);
      } else {
        discountAmount = item.discount;
      }
    }
    
    return sum + discountAmount;
  }, 0);
  
  // Calculate grand total
  const total = subtotal + taxTotal;
  
  return {
    ...invoice,
    items: updatedItems,
    subtotal,
    taxTotal,
    discountTotal,
    total,
    updatedAt: new Date().toISOString()
  };
};