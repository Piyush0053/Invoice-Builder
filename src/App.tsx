import { useState } from 'react';
import { Toaster } from 'react-hot-toast';
// @ts-ignore
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
// @ts-ignore
import { AuthProvider, useAuth } from './context/AuthContext';
import { InvoiceProvider } from './context/InvoiceContext';
import LandingPage from './components/landing/LandingPage';
import InvoiceForm from './components/invoice/InvoiceForm';
import Preview from './pages/Preview';
import Login from './components/auth/Login';
import Header from './components/layout/Header';
import TemplateSelector from './components/invoice/TemplateSelector';

// Main App component with routing
const App = () => {
  return (
    <Router>
      <AuthProvider>
        <InvoiceProvider>
          <div className="min-h-screen bg-gray-50">
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
            <AppRoutes />
          </div>
        </InvoiceProvider>
      </AuthProvider>
    </Router>
  );
};

// Component to handle routing
const AppRoutes = () => {
  const location = useLocation();
  const { currentUser } = useAuth();
  const isAuthenticated = !!currentUser;
  const [activeTab, setActiveTab] = useState('edit');
  const [selectedTemplate, setSelectedTemplate] = useState('standard');

  // If user is on a protected route but not authenticated, redirect to login
  if (location.pathname !== '/' && location.pathname !== '/login' && !isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If user is on login/register page but already authenticated, redirect to app
  if ((location.pathname === '/login' || location.pathname === '/') && isAuthenticated) {
    return <Navigate to="/app" replace />;
  }

  return (
    <Routes location={location}>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      
      {/* Protected routes */}
      <Route
        path="/app"
        element={
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
                      <Preview />
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
        }
      />
      
      {/* Preview route */}
      <Route
        path="/preview"
        element={
          <div className="min-h-screen bg-gray-50">
            <Header isMobileMenuOpen={false} onMobileMenuToggle={() => {}} />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
              <Preview />
            </div>
          </div>
        }
      />
      
      {/* Fallback route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};



export default App;