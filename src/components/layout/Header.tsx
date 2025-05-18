import React from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { Receipt, Download, Send, Plus, Home, Menu, X } from 'lucide-react';
import Button from '../ui/Button';
import { useInvoice } from '../../context/InvoiceContext';
import { downloadPDF } from '../../utils/pdfGenerator';

interface HeaderProps {
  isMobileMenuOpen: boolean;
  onMobileMenuToggle: () => void;
}

const Header: React.FC<HeaderProps> = ({ isMobileMenuOpen, onMobileMenuToggle }) => {
  const { currentInvoice, createNewInvoice } = useInvoice();
  
  const handleDownload = async () => {
    const invoicePreview = document.getElementById('invoice-preview');
    if (!invoicePreview) {
      toast.error('Invoice preview not yet loaded.');
      return;
    }
    
    try {
      if (currentInvoice) {
        await downloadPDF(currentInvoice);
        toast.success('Invoice downloaded successfully!');
      } else {
        toast.error('No invoice data available to download');
      }
    } catch (error) {
      toast.error('Failed to download invoice');
      console.error(error);
    }
  };
  
  const handleSend = () => {
    toast.success('Invoice sent successfully!');
  };



  return (
    <header className="bg-white border-b border-secondary-200 sticky top-0 z-20">
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
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={onMobileMenuToggle}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-3">
            <Button 
              variant="secondary" 
              size="sm"
              icon={<Home size={16} />}
              onClick={() => {
                window.history.pushState({}, '', '/');
                window.dispatchEvent(new Event('popstate'));
              }}
            >
              Home
            </Button>
            <Button 
              variant="primary" 
              size="sm"
              icon={<Plus size={16} />}
              onClick={createNewInvoice}
            >
              New Invoice
            </Button>
            <Button 
              variant="outline" 
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
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={onMobileMenuToggle}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Navigation Menu */}
      <div className={`md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-50">
          <button
            onClick={() => {
              window.history.pushState({}, '', '/');
              window.dispatchEvent(new Event('popstate'));
              onMobileMenuToggle?.();
            }}
            className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100"
          >
            Home
          </button>
          <button
            onClick={() => {
              createNewInvoice();
              onMobileMenuToggle?.();
            }}
            className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100"
          >
            New Invoice
          </button>
          <button
            onClick={() => {
              handleDownload();
              onMobileMenuToggle?.();
            }}
            className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100"
          >
            Download PDF
          </button>
          <button
            onClick={() => {
              handleSend();
              onMobileMenuToggle?.();
            }}
            className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100"
          >
            Send Invoice
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;