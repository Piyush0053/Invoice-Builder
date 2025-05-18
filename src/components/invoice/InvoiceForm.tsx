import React from 'react';
import { Plus, Trash2, Receipt, User, Calendar, CreditCard, DollarSign, Mail } from 'lucide-react';
import { motion } from 'framer-motion';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Textarea from '../ui/Textarea';
import Select from '../ui/Select';
import { useInvoice } from '../../context/InvoiceContext';
import { currencies } from '../../data/currencies';
import AnimatedSection from '../ui/AnimatedSection';
import { Company, Client } from '../../types';

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
  
  // Type guard to check if company is a Company object
  const isCompany = (company: any): company is Company => {
    return company && typeof company === 'object' && 'name' in company;
  };

  // Type guard to check if client is a Client object
  const isClient = (client: any): client is Client => {
    return client && typeof client === 'object' && 'name' in client;
  };

  // Helper function to get company details safely
  const getCompanyDetails = (companyData: Company | string | undefined = currentInvoice.company) => {
    if (!companyData) return { name: '', address: '', city: '', state: '', zipCode: '', country: '', phone: '', email: '', website: '', taxId: '', logo: '' };
    if (isCompany(companyData)) {
      return companyData;
    }
    return { name: String(companyData), address: '', city: '', state: '', zipCode: '', country: '', phone: '', email: '', website: '', taxId: '', logo: '' };
  };

  // Helper function to get client details safely
  const getClientDetails = (clientData: Client | string | undefined = currentInvoice.client) => {
    if (!clientData) return { name: '', email: '', phone: '', address: '', city: '', state: '', zipCode: '', country: '', taxId: '' };
    if (isClient(clientData)) {
      return clientData;
    }
    return { name: String(clientData), email: '', phone: '', address: '', city: '', state: '', zipCode: '', country: '', taxId: '' };
  };

  const company = getCompanyDetails();
  const client = getClientDetails();
  
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
  
  // Animation variants for form sections
  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  // Animation for form items
  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.5,
      },
    }),
  };

  // Function to handle sending invoice
  const handleSendInvoice = async () => {
    try {
      // TODO: Implement email sending logic
      alert('Invoice sent successfully!');
    } catch (error) {
      console.error('Error sending invoice:', error);
      alert('Failed to send invoice. Please try again.');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <Button 
          onClick={handleSendInvoice}
          variant="primary"
          className="flex items-center gap-2"
        >
          <Mail size={16} />
          Send Invoice
        </Button>
      </div>
      
      <AnimatedSection
        direction="up"
        duration={0.7}
        delay={0.1}
      >
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
        >
          <Card title="Invoice Details" className="mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div
                variants={itemVariants}
                custom={0}
                initial="hidden"
                animate="visible"
              >
                <Input
                  label="Invoice Number"
                  value={currentInvoice.invoiceNumber}
                  onChange={(value) => updateInvoiceField('invoiceNumber', value)}
                  icon={<Receipt size={16} className="text-secondary-400" />}
                />
              </motion.div>
            
              <motion.div
                variants={itemVariants}
                custom={1}
                initial="hidden"
                animate="visible"
              >
                <Select
                  label="Currency"
                  options={currencyOptions}
                  value={currentInvoice.currency}
                  onChange={(value) => updateInvoiceField('currency', value)}
                />
              </motion.div>
            
              <motion.div
                variants={itemVariants}
                custom={2}
                initial="hidden"
                animate="visible"
              >
                <Input
                  label="Invoice Date"
                  type="date"
                  value={currentInvoice.date}
                  onChange={(value) => updateInvoiceField('date', value)}
                  icon={<Calendar size={16} className="text-secondary-400" />}
                />
              </motion.div>
            
              <motion.div
                variants={itemVariants}
                custom={3}
                initial="hidden"
                animate="visible"
              >
                <Input
                  label="Due Date"
                  type="date"
                  value={currentInvoice.dueDate}
                  onChange={(value) => updateInvoiceField('dueDate', value)}
                  icon={<Calendar size={16} className="text-secondary-400" />}
                />
              </motion.div>
            
              <motion.div
                variants={itemVariants}
                custom={4}
                initial="hidden"
                animate="visible"
              >
                <Select
                  label="Status"
                  options={statusOptions}
                  value={currentInvoice.status}
                  onChange={(value) => updateInvoiceField('status', value as any)}
                />
              </motion.div>
            
              <motion.div
                variants={itemVariants}
                custom={5}
                initial="hidden"
                animate="visible"
              >
                <Input
                  label="Payment Method"
                  value={currentInvoice.paymentMethod || ''}
                  onChange={(value) => updateInvoiceField('paymentMethod', value)}
                  icon={<CreditCard size={16} className="text-secondary-400" />}
                  placeholder="e.g., Bank Transfer, PayPal, Credit Card"
                />
              </motion.div>
            </div>
          </Card>
        </motion.div>
      </AnimatedSection>
      
      <AnimatedSection
        direction="up"
        duration={0.7}
        delay={0.2}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card title="Your Company">
            <div className="space-y-4">
              <Input
                label="Company Name"
                value={company.name}
                onChange={(value) => updateCompany({ ...company, name: value })}
              />
              
              <Input
                label="Address"
                value={company.address}
                onChange={(value) => updateCompany({ ...company, address: value })}
              />
              
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="City"
                  value={company.city}
                  onChange={(value) => updateCompany({ ...company, city: value })}
                />
                
                <Input
                  label="State/Province"
                  value={company.state}
                  onChange={(value) => updateCompany({ ...company, state: value })}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Zip/Postal Code"
                  value={company.zipCode}
                  onChange={(value) => updateCompany({ ...company, zipCode: value })}
                />
                
                <Input
                  label="Country"
                  value={company.country}
                  onChange={(value) => updateCompany({ ...company, country: value })}
                />
              </div>
              
              <Input
                label="Phone"
                value={company.phone}
                onChange={(value) => updateCompany({ ...company, phone: value })}
              />
              
              <Input
                label="Email"
                type="email"
                value={company.email}
                onChange={(value) => updateCompany({ ...company, email: value })}
              />
              
              <Input
                label="Website"
                value={company.website}
                onChange={(value) => updateCompany({ ...company, website: value })}
              />
              
              <Input
                label="Tax ID / VAT Number"
                value={company.taxId}
                onChange={(value) => updateCompany({ ...company, taxId: value })}
              />
              
              <Input
                label="Logo URL"
                value={company.logo || ''}
                onChange={(value) => updateCompany({ ...company, logo: value })}
                placeholder="https://example.com/logo.png"
              />
            </div>
          </Card>
          
          <Card title="Client Information">
            <div className="space-y-4">
              <Input
                label="Client Name"
                value={client.name}
                onChange={(value) => updateClient({ ...client, name: value })}
                icon={<User size={16} className="text-secondary-400" />}
              />
              
              <Input
                label="Address"
                value={client.address}
                onChange={(value) => updateClient({ ...client, address: value })}
              />
              
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="City"
                  value={client.city}
                  onChange={(value) => updateClient({ ...client, city: value })}
                />
                
                <Input
                  label="State/Province"
                  value={client.state}
                  onChange={(value) => updateClient({ ...client, state: value })}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Zip/Postal Code"
                  value={client.zipCode}
                  onChange={(value) => updateClient({ ...client, zipCode: value })}
                />
                
                <Input
                  label="Country"
                  value={client.country}
                  onChange={(value) => updateClient({ ...client, country: value })}
                />
              </div>
              
              <Input
                label="Phone"
                value={client.phone}
                onChange={(value) => updateClient({ ...client, phone: value })}
              />
              
              <Input
                label="Email"
                type="email"
                value={client.email}
                onChange={(value) => updateClient({ ...client, email: value })}
              />
              
              <Input
                label="Tax ID / VAT Number"
                value={client.taxId}
                onChange={(value) => updateClient({ ...client, taxId: value })}
              />
            </div>
          </Card>
        </div>
      </AnimatedSection>
      
      <AnimatedSection
        direction="up"
        duration={0.7}
        delay={0.3}
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
                {currentInvoice.items.map((item, index) => (
                  <AnimatedSection 
                    key={item.id}
                    direction="up"
                    duration={0.5}
                    delay={0.1 + (index * 0.05)}
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
                        value={(item.unitPrice || 0).toString()}
                        onChange={(value) => updateItem(item.id, { unitPrice: parseFloat(value) || 0 })}
                        min="0"
                        step="0.01"
                      />
                    </div>
                    
                    <div className="col-span-1">
                      <Input
                        type="number"
                        value={(item.taxRate || 0).toString()}
                        onChange={(value) => updateItem(item.id, { taxRate: parseFloat(value) || 0 })}
                        min="0"
                        max="100"
                        step="0.1"
                      />
                    </div>
                    
                    <div className="col-span-2 flex space-x-2">
                      <Input
                        type="number"
                        value={(item.discount || 0).toString()}
                        onChange={(value) => updateItem(item.id, { discount: parseFloat(value) || 0 })}
                        min="0"
                        step={item.discountType === 'percentage' ? '1' : '0.01'}
                      />
                      
                      <Select
                        options={[
                          { value: 'percentage', label: '%' },
                          { value: 'fixed', label: '$' }
                        ]}
                        value={item.discountType || "percentage"}
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
                  </AnimatedSection>
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
                  ${(currentInvoice.taxTotal || currentInvoice.tax || 0).toFixed(2)}
                </span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-secondary-600">Discount:</span>
                <span className="font-medium">
                  <DollarSign className="inline-block h-4 w-4 text-secondary-500" />
                  ${(currentInvoice.discountTotal || currentInvoice.discount || 0).toFixed(2)}
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
      </AnimatedSection>
      
      <AnimatedSection
        direction="up"
        duration={0.7}
        delay={0.4}
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
      </AnimatedSection>
    </div>
  );
};

export default InvoiceForm;