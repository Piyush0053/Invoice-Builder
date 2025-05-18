import React from 'react';
import { motion } from 'framer-motion';
import { Receipt, FileText, Settings, Download, Send, Plus } from 'lucide-react';
import Button from '../ui/Button';
import { useInvoice } from '../../context/InvoiceContext';
import { downloadPDF } from '../../utils/pdfGenerator';
import toast from 'react-hot-toast';

const Header: React.FC = () => {
  const { currentInvoice, createNewInvoice } = useInvoice();
  
  const handleDownload = async () => {
    const invoicePreview = document.getElementById('invoice-preview');
    if (!invoicePreview) {
      toast.error('Invoice preview not yet loaded.');
      return;
    }
    
    try {
      await downloadPDF(currentInvoice);
      toast.success('Invoice downloaded successfully!');
    } catch (error) {
      toast.error('Failed to download invoice');
      console.error(error);
    }
  };
  
  const handleSend = () => {
    toast.success('Invoice sent successfully!');
  };
  
  return (
    <header className="bg-white border-b border-secondary-200 sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center"
          >
            <Receipt className="h-8 w-8 text-primary-600" />
            <h1 className="ml-2 text-xl font-bold text-secondary-900">InvoiceForge</h1>
          </motion.div>
          
          <div className="flex items-center space-x-3">
            <Button 
              variant="secondary" 
              size="sm"
              icon={<Plus size={16} />}
              onClick={createNewInvoice}
            >
              New
            </Button>
            
            <Button 
              variant="secondary" 
              size="sm"
              icon={<Download size={16} />}
              onClick={handleDownload}
            >
              Download
            </Button>
            
            <Button 
              variant="primary" 
              size="sm"
              icon={<Send size={16} />}
              onClick={handleSend}
            >
              Send
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;