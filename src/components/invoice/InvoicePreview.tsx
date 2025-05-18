import React from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { useInvoice } from '../../context/InvoiceContext';
import { formatCurrency } from '../../data/currencies';

const InvoicePreview: React.FC = () => {
  const { currentInvoice } = useInvoice();
  
  const statusColors = {
    draft: 'bg-yellow-100 text-yellow-800',
    sent: 'bg-blue-100 text-blue-800',
    paid: 'bg-green-100 text-green-800',
    overdue: 'bg-red-100 text-red-800'
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-xl shadow-card overflow-hidden"
      id="invoice-preview"
    >
      {/* Header */}
      <div className="bg-primary-600 text-white p-6">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold">INVOICE</h2>
            <p className="text-primary-100 mt-1">#{currentInvoice.invoiceNumber}</p>
          </div>
          
          <div className="text-right">
            <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${statusColors[currentInvoice.status]}`}>
              {currentInvoice.status.charAt(0).toUpperCase() + currentInvoice.status.slice(1)}
            </span>
          </div>
        </div>
      </div>
      
      {/* Company and Client Info */}
      <div className="p-6 grid grid-cols-2 gap-6">
        <div>
          <div className="flex items-center mb-4">
            {currentInvoice.company.logo && (
              <img 
                src={currentInvoice.company.logo} 
                alt={`${currentInvoice.company.name} logo`} 
                className="h-12 w-auto mr-3 object-contain"
              />
            )}
            <h3 className="text-xl font-bold text-secondary-900">{currentInvoice.company.name}</h3>
          </div>
          
          <div className="text-sm text-secondary-600 space-y-1">
            <p>{currentInvoice.company.address}</p>
            <p>{currentInvoice.company.city}, {currentInvoice.company.state} {currentInvoice.company.zipCode}</p>
            <p>{currentInvoice.company.country}</p>
            <p>Phone: {currentInvoice.company.phone}</p>
            <p>Email: {currentInvoice.company.email}</p>
            <p>Tax ID: {currentInvoice.company.taxId}</p>
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold text-secondary-900 mb-4">Bill To:</h3>
          <div className="text-sm text-secondary-600 space-y-1">
            <p className="font-medium text-secondary-800">{currentInvoice.client.name}</p>
            <p>{currentInvoice.client.address}</p>
            <p>{currentInvoice.client.city}, {currentInvoice.client.state} {currentInvoice.client.zipCode}</p>
            <p>{currentInvoice.client.country}</p>
            <p>Phone: {currentInvoice.client.phone}</p>
            <p>Email: {currentInvoice.client.email}</p>
            {currentInvoice.client.taxId && <p>Tax ID: {currentInvoice.client.taxId}</p>}
          </div>
        </div>
      </div>
      
      {/* Invoice Details */}
      <div className="px-6 py-4 bg-secondary-50 border-y border-secondary-200">
        <div className="grid grid-cols-3 gap-4">
          <div>
            <p className="text-xs text-secondary-500">Invoice Date</p>
            <p className="font-medium">
              {format(new Date(currentInvoice.date), 'MMM dd, yyyy')}
            </p>
          </div>
          
          <div>
            <p className="text-xs text-secondary-500">Due Date</p>
            <p className="font-medium">
              {format(new Date(currentInvoice.dueDate), 'MMM dd, yyyy')}
            </p>
          </div>
          
          <div>
            <p className="text-xs text-secondary-500">Payment Method</p>
            <p className="font-medium">
              {currentInvoice.paymentMethod || 'Not specified'}
            </p>
          </div>
        </div>
      </div>
      
      {/* Invoice Items */}
      <div className="p-6">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-secondary-200">
              <th className="text-left py-2 font-semibold text-secondary-700">Description</th>
              <th className="text-center py-2 font-semibold text-secondary-700">Qty</th>
              <th className="text-right py-2 font-semibold text-secondary-700">Unit Price</th>
              <th className="text-right py-2 font-semibold text-secondary-700">Tax</th>
              <th className="text-right py-2 font-semibold text-secondary-700">Discount</th>
              <th className="text-right py-2 font-semibold text-secondary-700">Amount</th>
            </tr>
          </thead>
          <tbody>
            {currentInvoice.items.map((item) => (
              <tr key={item.id} className="border-b border-secondary-100">
                <td className="py-3 text-secondary-800">{item.description}</td>
                <td className="py-3 text-center text-secondary-800">{item.quantity}</td>
                <td className="py-3 text-right text-secondary-800">
                  {formatCurrency(item.unitPrice, currentInvoice.currency)}
                </td>
                <td className="py-3 text-right text-secondary-800">
                  {item.taxRate > 0 ? `${item.taxRate}%` : '-'}
                </td>
                <td className="py-3 text-right text-secondary-800">
                  {item.discount > 0 
                    ? item.discountType === 'percentage' 
                      ? `${item.discount}%` 
                      : formatCurrency(item.discount, currentInvoice.currency)
                    : '-'
                  }
                </td>
                <td className="py-3 text-right font-medium text-secondary-800">
                  {formatCurrency(item.total, currentInvoice.currency)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {/* Totals */}
        <div className="mt-6 border-t border-secondary-200 pt-4">
          <div className="flex justify-end">
            <div className="w-64 space-y-2">
              <div className="flex justify-between">
                <span className="text-secondary-600">Subtotal:</span>
                <span className="font-medium">
                  {formatCurrency(currentInvoice.subtotal, currentInvoice.currency)}
                </span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-secondary-600">Tax:</span>
                <span className="font-medium">
                  {formatCurrency(currentInvoice.taxTotal, currentInvoice.currency)}
                </span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-secondary-600">Discount:</span>
                <span className="font-medium">
                  {formatCurrency(currentInvoice.discountTotal, currentInvoice.currency)}
                </span>
              </div>
              
              <div className="flex justify-between pt-2 border-t border-secondary-200">
                <span className="text-lg font-semibold text-secondary-800">Total:</span>
                <span className="text-lg font-bold text-primary-600">
                  {formatCurrency(currentInvoice.total, currentInvoice.currency)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Notes and Terms */}
      <div className="p-6 bg-secondary-50 border-t border-secondary-200">
        {currentInvoice.notes && (
          <div className="mb-4">
            <h4 className="text-sm font-semibold text-secondary-700 mb-1">Notes</h4>
            <p className="text-sm text-secondary-600">{currentInvoice.notes}</p>
          </div>
        )}
        
        {currentInvoice.terms && (
          <div>
            <h4 className="text-sm font-semibold text-secondary-700 mb-1">Terms & Conditions</h4>
            <p className="text-sm text-secondary-600">{currentInvoice.terms}</p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default InvoicePreview;