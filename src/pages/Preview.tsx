import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useInvoice } from '../context/InvoiceContext';
import { Company, Client } from '../types';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { Mail, Download, ArrowLeft, X } from 'lucide-react';
import AnimatedSection from '../components/ui/AnimatedSection';
import { motion, AnimatePresence } from 'framer-motion';
import { generatePdf } from '../utils/pdfGenerator';

const Preview: React.FC = () => {
  const { currentInvoice, sendInvoice } = useInvoice();
  const navigate = useNavigate();
  const [isSending, setIsSending] = useState(false);
  const [showSendModal, setShowSendModal] = useState(false);
  const [emailTo, setEmailTo] = useState('');
  const [emailSubject, setEmailSubject] = useState(`Invoice ${currentInvoice.invoiceNumber}`);
  const [emailMessage, setEmailMessage] = useState('Please find attached the invoice for your recent purchase. Thank you for your business!');
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const previewRef = useRef<HTMLDivElement>(null);
  
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
    if (!companyData) return { name: '', address: '', city: '', state: '', zipCode: '', country: '' };
    if (isCompany(companyData)) {
      return companyData;
    }
    return { name: String(companyData), address: '', city: '', state: '', zipCode: '', country: '' };
  };

  // Helper function to get client details safely
  const getClientDetails = (clientData: Client | string | undefined = currentInvoice.client) => {
    if (!clientData) return { name: '', email: '', phone: '', address: '', city: '', state: '', zipCode: '', country: '' };
    if (isClient(clientData)) {
      return clientData;
    }
    return { name: String(clientData), email: '', phone: '', address: '', city: '', state: '', zipCode: '', country: '' };
  };

  const company = getCompanyDetails();
  const client = getClientDetails();

  useEffect(() => {
    let isMounted = true;
    
    const generatePreview = async () => {
      if (!previewRef.current) return;
      
      try {
        const pdfBlob = await generatePdf(previewRef.current);
        if (isMounted && pdfBlob) {
          const url = URL.createObjectURL(pdfBlob);
          setPreviewUrl(url);
        }
      } catch (error) {
        console.error('Error generating preview:', error);
      }
    };

    generatePreview();
    
    // Clean up the object URL when the component unmounts or before generating a new preview
    return () => {
      isMounted = false;
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [currentInvoice]); // Regenerate when invoice changes

  const handleSendInvoice = async () => {
    setShowSendModal(true);
  };

  const handleSendToEmail = async () => {
    if (!emailTo) {
      alert('Please enter an email address');
      return;
    }

    try {
      setIsSending(true);
      if (!previewRef.current) return;
      
      const pdfBlob = await generatePdf(previewRef.current);
      if (pdfBlob) {
        const success = await sendInvoice(emailTo, emailSubject, emailMessage, pdfBlob);
        if (success) {
          setShowSendModal(false);
          alert('Invoice sent successfully!');
        }
      }
    } catch (error) {
      console.error('Error sending invoice:', error);
      alert('Failed to send invoice. Please try again.');
    } finally {
      setIsSending(false);
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <AnimatedSection className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <Button
          variant="outline"
          icon={<ArrowLeft size={16} />}
          onClick={handleBack}
        >
          Back
        </Button>

        <div className="flex space-x-2">
          <Button
            variant="outline"
            onClick={() => window.print()}
            icon={<span className="material-icons-outlined text-sm">print</span>}
          >
            Print
          </Button>

          {previewUrl && (
            <a
              href={previewUrl}
              download={`invoice-${currentInvoice.invoiceNumber}.pdf`}
              className="inline-block"
            >
              <Button
                variant="outline"
                icon={<Download size={16} />}
              >
                Download PDF
              </Button>
            </a>
          )}

          <Button
            variant="primary"
            onClick={handleSendInvoice}
            isLoading={isSending}
            icon={<Mail size={16} />}
          >
            Send Invoice
          </Button>
        </div>
      </div>

      {/* Send Invoice Modal */}
      <AnimatePresence>
        {showSendModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4"
          >
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Send Invoice</h2>
                <button
                  onClick={() => setShowSendModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-4">
                <Input
                  label="Email Address"
                  type="email"
                  value={emailTo}
                  onChange={(value) => setEmailTo(value)}
                  placeholder="recipient@example.com"
                  required
                />

                <Input
                  label="Subject"
                  value={emailSubject}
                  onChange={(value) => setEmailSubject(value)}
                />

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Message
                  </label>
                  <textarea
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    rows={4}
                    value={emailMessage}
                    onChange={(e) => setEmailMessage(e.target.value)}
                  ></textarea>
                </div>

                <div className="flex justify-end space-x-2 mt-6">
                  <Button
                    variant="outline"
                    onClick={() => setShowSendModal(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="primary"
                    onClick={handleSendToEmail}
                    isLoading={isSending}
                    icon={<Mail size={16} />}
                  >
                    Send
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        {previewUrl ? (
          <iframe
            src={previewUrl}
            className="w-full h-[80vh] border rounded"
            title="Invoice Preview"
          />
        ) : (
          <div className="flex items-center justify-center h-64">
            <p>Generating preview...</p>
          </div>
        )}
      </div>

      {/* Hidden div for PDF generation */}
      <div className="hidden">
        <div ref={previewRef} className="p-8">
          <div className="mb-8">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-2xl font-bold">INVOICE</h1>
                <p className="text-gray-500">#{currentInvoice.invoiceNumber}</p>
              </div>
              <div className="text-right">
                <p className="font-semibold">{company.name || 'Company Name'}</p>
                {company.address && <p>{company.address}</p>}
                <p>
                  {[company.city, company.state, company.zipCode].filter(Boolean).join(', ')}
                </p>
                {company.country && <p>{company.country}</p>}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="font-semibold mb-2">Bill To:</h3>
              <p>{client.name || 'Client Name'}</p>
              {client.email && <p>{client.email}</p>}
              {client.phone && <p>{client.phone}</p>}
              {client.address && <p>{client.address}</p>}
              {client.city && (
                <p>
                  {[client.city, client.state, client.zipCode].filter(Boolean).join(', ')}
                </p>
              )}
              {client.country && <p>{client.country}</p>}
            </div>
            <div className="text-right">
              <p><span className="font-semibold">Invoice Date:</span> {new Date(currentInvoice.date).toLocaleDateString()}</p>
              <p><span className="font-semibold">Due Date:</span> {new Date(currentInvoice.dueDate).toLocaleDateString()}</p>
              <p><span className="font-semibold">Status:</span> {currentInvoice.status}</p>
              {currentInvoice.paymentMethod && (
                <p><span className="font-semibold">Payment Method:</span> {currentInvoice.paymentMethod}</p>
              )}
            </div>
          </div>

          <div className="mb-8">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">Item</th>
                  <th className="text-right py-2">Quantity</th>
                  <th className="text-right py-2">Price</th>
                  <th className="text-right py-2">Total</th>
                </tr>
              </thead>
              <tbody>
                {currentInvoice.items.map((item) => (
                  <tr key={item.id} className="border-b">
                    <td className="py-2">
                      <p className="font-medium">{item.description || 'Item Description'}</p>
                      {item.note && <p className="text-sm text-gray-600">{item.note}</p>}
                    </td>
                    <td className="text-right py-2">{item.quantity}</td>
                    <td className="text-right py-2">
                      {new Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: currentInvoice.currency || 'USD',
                      }).format(item.unitPrice || 0)}
                    </td>
                    <td className="text-right py-2">
                      {new Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: currentInvoice.currency || 'USD',
                      }).format(item.quantity * (item.unitPrice || 0))}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan={3} className="text-right font-semibold py-2">Subtotal:</td>
                  <td className="text-right py-2">
                    {new Intl.NumberFormat('en-US', {
                      style: 'currency',
                      currency: currentInvoice.currency || 'USD',
                    }).format(currentInvoice.subtotal || 0)}
                  </td>
                </tr>
                {currentInvoice.tax > 0 && (
                  <tr>
                    <td colSpan={3} className="text-right font-semibold py-2">
                      Tax ({currentInvoice.taxRate || 0}%):
                    </td>
                    <td className="text-right py-2">
                      {new Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: currentInvoice.currency || 'USD',
                      }).format(currentInvoice.tax || 0)}
                    </td>
                  </tr>
                )}
                {(currentInvoice.discount || 0) > 0 && (
                  <tr>
                    <td colSpan={3} className="text-right font-semibold py-2">
                      Discount:
                    </td>
                    <td className="text-right py-2">
                      -{new Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: currentInvoice.currency || 'USD',
                      }).format(currentInvoice.discount || 0)}
                    </td>
                  </tr>
                )}
                <tr className="border-t-2">
                  <td colSpan={3} className="text-right font-bold py-2">Total:</td>
                  <td className="text-right font-bold py-2">
                    {new Intl.NumberFormat('en-US', {
                      style: 'currency',
                      currency: currentInvoice.currency || 'USD',
                    }).format(currentInvoice.total || 0)}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>

          {currentInvoice.notes && (
            <div className="mt-8 pt-4 border-t">
              <h3 className="font-semibold mb-2">Notes</h3>
              <p className="whitespace-pre-line">{currentInvoice.notes}</p>
            </div>
          )}
        </div>
      </div>
    </AnimatedSection>
  );
};

export default Preview;
