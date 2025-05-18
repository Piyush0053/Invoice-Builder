import React from 'react';
import { motion } from 'framer-motion';
import { Plus, Trash2, Receipt, User, Calendar, CreditCard, DollarSign } from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Textarea from '../ui/Textarea';
import Select from '../ui/Select';
import { useInvoice } from '../../context/InvoiceContext';
import { currencies } from '../../data/currencies';
import { v4 as uuidv4 } from 'uuid';

const InvoiceForm: React.FC = () => {
  const { 
    currentInvoice, 
    updateCompany, 
    updateClient, 
    addItem, 
    updateItem, 
    removeItem,
    updateInvoiceField
  } = useInvoice();
  
  const currencyOptions = currencies.map(currency => ({
    value: currency.code,
    label: `${currency.code} (${currency.symbol}) - ${currency.name}`
  }));
  
  const statusOptions = [
    { value: 'draft', label: 'Draft' },
    { value: 'sent', label: 'Sent' },
    { value: 'paid', label: 'Paid' },
    { value: 'overdue', label: 'Overdue' }
  ];
  
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card title="Invoice Details" className="mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Invoice Number"
              value={currentInvoice.invoiceNumber}
              onChange={(value) => updateInvoiceField('invoiceNumber', value)}
              icon={<Receipt size={16} className="text-secondary-400" />}
            />
            
            <Select
              label="Currency"
              options={currencyOptions}
              value={currentInvoice.currency}
              onChange={(value) => updateInvoiceField('currency', value)}
            />
            
            <Input
              label="Invoice Date"
              type="date"
              value={currentInvoice.date}
              onChange={(value) => updateInvoiceField('date', value)}
              icon={<Calendar size={16} className="text-secondary-400" />}
            />
            
            <Input
              label="Due Date"
              type="date"
              value={currentInvoice.dueDate}
              onChange={(value) => updateInvoiceField('dueDate', value)}
              icon={<Calendar size={16} className="text-secondary-400" />}
            />
            
            <Select
              label="Status"
              options={statusOptions}
              value={currentInvoice.status}
              onChange={(value) => updateInvoiceField('status', value as any)}
            />
            
            <Input
              label="Payment Method"
              value={currentInvoice.paymentMethod || ''}
              onChange={(value) => updateInvoiceField('paymentMethod', value)}
              icon={<CreditCard size={16} className="text-secondary-400" />}
              placeholder="e.g., Bank Transfer, PayPal, Credit Card"
            />
          </div>
        </Card>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card title="Your Company">
            <div className="space-y-4">
              <Input
                label="Company Name"
                value={currentInvoice.company.name}
                onChange={(value) => updateCompany({ ...currentInvoice.company, name: value })}
              />
              
              <Input
                label="Address"
                value={currentInvoice.company.address}
                onChange={(value) => updateCompany({ ...currentInvoice.company, address: value })}
              />
              
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="City"
                  value={currentInvoice.company.city}
                  onChange={(value) => updateCompany({ ...currentInvoice.company, city: value })}
                />
                
                <Input
                  label="State/Province"
                  value={currentInvoice.company.state}
                  onChange={(value) => updateCompany({ ...currentInvoice.company, state: value })}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Zip/Postal Code"
                  value={currentInvoice.company.zipCode}
                  onChange={(value) => updateCompany({ ...currentInvoice.company, zipCode: value })}
                />
                
                <Input
                  label="Country"
                  value={currentInvoice.company.country}
                  onChange={(value) => updateCompany({ ...currentInvoice.company, country: value })}
                />
              </div>
              
              <Input
                label="Phone"
                value={currentInvoice.company.phone}
                onChange={(value) => updateCompany({ ...currentInvoice.company, phone: value })}
              />
              
              <Input
                label="Email"
                type="email"
                value={currentInvoice.company.email}
                onChange={(value) => updateCompany({ ...currentInvoice.company, email: value })}
              />
              
              <Input
                label="Website"
                value={currentInvoice.company.website}
                onChange={(value) => updateCompany({ ...currentInvoice.company, website: value })}
              />
              
              <Input
                label="Tax ID / VAT Number"
                value={currentInvoice.company.taxId}
                onChange={(value) => updateCompany({ ...currentInvoice.company, taxId: value })}
              />
              
              <Input
                label="Logo URL"
                value={currentInvoice.company.logo || ''}
                onChange={(value) => updateCompany({ ...currentInvoice.company, logo: value })}
                placeholder="https://example.com/logo.png"
              />
            </div>
          </Card>
          
          <Card title="Client Information">
            <div className="space-y-4">
              <Input
                label="Client Name"
                value={currentInvoice.client.name}
                onChange={(value) => updateClient({ ...currentInvoice.client, name: value })}
                icon={<User size={16} className="text-secondary-400" />}
              />
              
              <Input
                label="Address"
                value={currentInvoice.client.address}
                onChange={(value) => updateClient({ ...currentInvoice.client, address: value })}
              />
              
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="City"
                  value={currentInvoice.client.city}
                  onChange={(value) => updateClient({ ...currentInvoice.client, city: value })}
                />
                
                <Input
                  label="State/Province"
                  value={currentInvoice.client.state}
                  onChange={(value) => updateClient({ ...currentInvoice.client, state: value })}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Zip/Postal Code"
                  value={currentInvoice.client.zipCode}
                  onChange={(value) => updateClient({ ...currentInvoice.client, zipCode: value })}
                />
                
                <Input
                  label="Country"
                  value={currentInvoice.client.country}
                  onChange={(value) => updateClient({ ...currentInvoice.client, country: value })}
                />
              </div>
              
              <Input
                label="Phone"
                value={currentInvoice.client.phone}
                onChange={(value) => updateClient({ ...currentInvoice.client, phone: value })}
              />
              
              <Input
                label="Email"
                type="email"
                value={currentInvoice.client.email}
                onChange={(value) => updateClient({ ...currentInvoice.client, email: value })}
              />
              
              <Input
                label="Tax ID / VAT Number"
                value={currentInvoice.client.taxId}
                onChange={(value) => updateClient({ ...currentInvoice.client, taxId: value })}
              />
            </div>
          </Card>
        </div>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card 
          title="Invoice Items" 
          subtitle="Add the products or services you're billing for"
          footer={
            <Button 
              variant="secondary" 
              icon={<Plus size={16} />} 
              onClick={addItem}
              fullWidth
            >
              Add Item
            </Button>
          }
        >
          <div className="overflow-x-auto">
            <div className="invoice-item-row-header">
              <div className="col-span-5">Description</div>
              <div className="col-span-1 text-center">Qty</div>
              <div className="col-span-2 text-right">Unit Price</div>
              <div className="col-span-1 text-center">Tax %</div>
              <div className="col-span-2 text-right">Discount</div>
              <div className="col-span-1 text-center">Actions</div>
            </div>
            
            {currentInvoice.items.length === 0 ? (
              <div className="py-4 text-center text-secondary-500">
                No items added yet. Click "Add Item" to get started.
              </div>
            ) : (
              <div className="space-y-2 mt-2">
                {currentInvoice.items.map((item) => (
                  <motion.div 
                    key={item.id}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="invoice-item-row border-b border-secondary-100 pb-2"
                  >
                    <div className="col-span-5">
                      <Input
                        value={item.description}
                        onChange={(value) => updateItem(item.id, { description: value })}
                        placeholder="Item description"
                      />
                    </div>
                    
                    <div className="col-span-1">
                      <Input
                        type="number"
                        value={item.quantity.toString()}
                        onChange={(value) => updateItem(item.id, { quantity: parseFloat(value) || 0 })}
                        min="1"
                        step="1"
                      />
                    </div>
                    
                    <div className="col-span-2">
                      <Input
                        type="number"
                        value={item.unitPrice.toString()}
                        onChange={(value) => updateItem(item.id, { unitPrice: parseFloat(value) || 0 })}
                        min="0"
                        step="0.01"
                      />
                    </div>
                    
                    <div className="col-span-1">
                      <Input
                        type="number"
                        value={item.taxRate.toString()}
                        onChange={(value) => updateItem(item.id, { taxRate: parseFloat(value) || 0 })}
                        min="0"
                        max="100"
                        step="0.1"
                      />
                    </div>
                    
                    <div className="col-span-2 flex space-x-2">
                      <Input
                        type="number"
                        value={item.discount.toString()}
                        onChange={(value) => updateItem(item.id, { discount: parseFloat(value) || 0 })}
                        min="0"
                        step={item.discountType === 'percentage' ? '1' : '0.01'}
                      />
                      
                      <Select
                        options={[
                          { value: 'percentage', label: '%' },
                          { value: 'fixed', label: '$' }
                        ]}
                        value={item.discountType}
                        onChange={(value) => updateItem(item.id, { discountType: value as 'percentage' | 'fixed' })}
                        className="w-16"
                      />
                    </div>
                    
                    <div className="col-span-1 flex justify-center items-center">
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-red-500 hover:text-red-700 transition-colors"
                        aria-label="Remove item"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
            
            <div className="mt-6 space-y-2 border-t border-secondary-200 pt-4">
              <div className="flex justify-between">
                <span className="text-secondary-600">Subtotal:</span>
                <span className="font-medium">
                  <DollarSign className="inline-block h-4 w-4 text-secondary-500" />
                  {currentInvoice.subtotal.toFixed(2)}
                </span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-secondary-600">Tax:</span>
                <span className="font-medium">
                  <DollarSign className="inline-block h-4 w-4 text-secondary-500" />
                  {currentInvoice.taxTotal.toFixed(2)}
                </span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-secondary-600">Discount:</span>
                <span className="font-medium">
                  <DollarSign className="inline-block h-4 w-4 text-secondary-500" />
                  {currentInvoice.discountTotal.toFixed(2)}
                </span>
              </div>
              
              <div className="flex justify-between pt-2 border-t border-secondary-200">
                <span className="text-lg font-semibold text-secondary-800">Total:</span>
                <span className="text-lg font-bold text-primary-600">
                  <DollarSign className="inline-block h-5 w-5" />
                  {currentInvoice.total.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card title="Additional Information">
          <div className="space-y-4">
            <Textarea
              label="Notes"
              value={currentInvoice.notes}
              onChange={(value) => updateInvoiceField('notes', value)}
              placeholder="Add any notes or additional information for your client..."
              rows={3}
            />
            
            <Textarea
              label="Terms & Conditions"
              value={currentInvoice.terms}
              onChange={(value) => updateInvoiceField('terms', value)}
              placeholder="Add your payment terms, return policy, etc..."
              rows={3}
            />
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

export default InvoiceForm;