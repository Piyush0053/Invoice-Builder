import React, { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import Header from './components/layout/Header';
import InvoiceForm from './components/invoice/InvoiceForm';
import InvoicePreview from './components/invoice/InvoicePreview';
import TemplateSelector from './components/invoice/TemplateSelector';
import { InvoiceProvider } from './context/InvoiceContext';

function App() {
  const [selectedTemplate, setSelectedTemplate] = useState('standard');
  const [activeTab, setActiveTab] = useState<'edit' | 'preview'>('edit');
  
  return (
    <InvoiceProvider>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header />
        
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="mb-6">
            <div className="sm:hidden">
              <select
                className="block w-full rounded-md border-secondary-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                value={activeTab}
                onChange={(e) => setActiveTab(e.target.value as 'edit' | 'preview')}
              >
                <option value="edit">Edit Invoice</option>
                <option value="preview">Preview</option>
              </select>
            </div>
            
            <div className="hidden sm:block">
              <nav className="flex space-x-4" aria-label="Tabs">
                <button
                  onClick={() => setActiveTab('edit')}
                  className={`px-3 py-2 font-medium text-sm rounded-md ${
                    activeTab === 'edit'
                      ? 'bg-primary-100 text-primary-700'
                      : 'text-secondary-500 hover:text-secondary-700'
                  }`}
                >
                  Edit Invoice
                </button>
                <button
                  onClick={() => setActiveTab('preview')}
                  className={`px-3 py-2 font-medium text-sm rounded-md ${
                    activeTab === 'preview'
                      ? 'bg-primary-100 text-primary-700'
                      : 'text-secondary-500 hover:text-secondary-700'
                  }`}
                >
                  Preview
                </button>
              </nav>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {activeTab === 'edit' ? (
              <>
                <div className="lg:col-span-8">
                  <InvoiceForm />
                </div>
                <div className="lg:col-span-4">
                  <div className="sticky top-24">
                    <TemplateSelector
                      selectedTemplate={selectedTemplate}
                      onSelectTemplate={setSelectedTemplate}
                    />
                  </div>
                </div>
              </>
            ) : (
              <div className="lg:col-span-12">
                <InvoicePreview />
              </div>
            )}
          </div>
        </main>
        
        <footer className="bg-white border-t border-secondary-200 py-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-center text-sm text-secondary-500">
              InvoiceForge - Modern Invoice Builder © {new Date().getFullYear()}
            </p>
          </div>
        </footer>
      </div>
      
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#363636',
            color: '#fff',
          },
        }}
      />
    </InvoiceProvider>
  );
}

export default App;