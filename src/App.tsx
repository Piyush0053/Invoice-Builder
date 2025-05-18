import React, { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import Header from './components/layout/Header';
import InvoiceForm from './components/invoice/InvoiceForm';
import InvoicePreview from './components/invoice/InvoicePreview';
import TemplateSelector from './components/invoice/TemplateSelector';
import { InvoiceProvider } from './context/InvoiceContext';
import LandingPage from './components/landing/LandingPage';
import { TestComponent } from './types/test-types';

function App() {
  const [selectedTemplate, setSelectedTemplate] = useState('standard');
  const [activeTab, setActiveTab] = useState<'edit' | 'preview'>('edit');
  const [currentRoute, setCurrentRoute] = useState<'landing' | 'app'>('landing');

  // Handle navigation to the app
  useEffect(() => {
    // Listen for navigation events
    const handleNavigation = () => {
      const path = window.location.pathname;
      if (path === '/app') {
        setCurrentRoute('app');
      } else {
        setCurrentRoute('landing');
      }
    };

    // Set up initial route
    handleNavigation();

    // Set up history event listener
    window.addEventListener('popstate', handleNavigation);

    // Override the normal behavior of links to /app to use our router
    document.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      const closestAnchor = target.closest('a');
      
      if (closestAnchor && closestAnchor.getAttribute('href') === '/app') {
        e.preventDefault();
        window.history.pushState({}, '', '/app');
        setCurrentRoute('app');
      }
    });

    return () => {
      window.removeEventListener('popstate', handleNavigation);
    };
  }, []);

  // Alternative approach to handle navigation without redefining window.location
  useEffect(() => {
    // Create a custom navigation function
    const handleCustomNavigation = (url: string) => {
      if (url === '/app') {
        window.history.pushState({}, '', '/app');
        setCurrentRoute('app');
      } else {
        window.location.href = url;
      }
    };

    // Expose the navigation function globally
    (window as any).customNavigate = handleCustomNavigation;

    // Add a click event listener to intercept navigation actions
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const navigationLink = target.closest('[data-navigation]');
      
      if (navigationLink) {
        const targetUrl = navigationLink.getAttribute('data-navigation-target');
        if (targetUrl) {
          e.preventDefault();
          handleCustomNavigation(targetUrl);
        }
      }
    };

    document.addEventListener('click', handleClick);

    return () => {
      // Clean up
      document.removeEventListener('click', handleClick);
      delete (window as any).customNavigate;
    };
  }, []);
  
  // Render the appropriate component based on the route
  if (currentRoute === 'landing') {
    return (
      <>
        <LandingPage />
        <div style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 1000 }}>
          <TestComponent />
        </div>
      </>
    );
  }
  
  // App route content
  return (
    <InvoiceProvider>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header isMobileMenuOpen={false} onMobileMenuToggle={() => {}} />
        
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-3">
              <div className="bg-white rounded-lg shadow p-6 mb-6">
                <div className="sm:hidden mb-4">
                  <select
                    className="block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
                    value={activeTab}
                    onChange={(e) => setActiveTab(e.target.value as 'edit' | 'preview')}
                  >
                    <option value="edit">Edit Invoice</option>
                    <option value="preview">Preview</option>
                  </select>
                </div>
                
                <div className="hidden sm:block mb-6">
                  <nav className="flex space-x-4" aria-label="Tabs">
                    <button
                      onClick={() => setActiveTab('edit')}
                      className={`px-3 py-2 text-sm font-medium rounded-md ${
                        activeTab === 'edit'
                          ? 'bg-primary-100 text-primary-700'
                          : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      Edit Invoice
                    </button>
                    <button
                      onClick={() => setActiveTab('preview')}
                      className={`px-3 py-2 text-sm font-medium rounded-md ${
                        activeTab === 'preview'
                          ? 'bg-primary-100 text-primary-700'
                          : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      Preview
                    </button>
                  </nav>
                </div>

                <div className={activeTab === 'edit' ? 'block' : 'hidden md:block'}>
                  <InvoiceForm />
                </div>
                <div className={activeTab === 'preview' ? 'block' : 'hidden md:block'}>
                  <InvoicePreview />
                </div>
              </div>
            </div>
            
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-6">
                <TemplateSelector
                  selectedTemplate={selectedTemplate}
                  onSelectTemplate={setSelectedTemplate}
                />
              </div>
            </div>
          </div>
        </main>
        
        <footer className="bg-white border-t border-secondary-200 py-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-center text-sm text-secondary-500">
              InvoiceForge - Modern Invoice Builder &copy; {new Date().getFullYear()}
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