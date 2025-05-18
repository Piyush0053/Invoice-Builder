import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <nav className="bg-white border-b border-gray-200 py-4 px-6 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center">
            <span className="text-2xl font-bold text-[#0170BA]">Invoice-Builder</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-600 hover:text-[#0170BA] transition-colors">
              Features
            </a>
            <a href="#how-it-works" className="text-gray-600 hover:text-[#0170BA] transition-colors">
              How It Works
            </a>
            <a href="#pricing" className="text-gray-600 hover:text-[#0170BA] transition-colors">
              Pricing
            </a>
            <a href="#testimonials" className="text-gray-600 hover:text-[#0170BA] transition-colors">
              Testimonials
            </a>
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              data-navigation
              data-navigation-target="/app"
              className="text-[#0170BA] hover:text-[#0052A5] transition-colors"
              onClick={() => navigate('/login')}
            >
              Login
            </button>
            <button
              data-navigation
              data-navigation-target="/app"
              className="bg-[#0170BA] hover:bg-[#0052A5] text-white px-4 py-2 rounded-md transition-colors"
              onClick={() => navigate('/app')}
            >
              Get Started
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-2">
            <div className="flex flex-col space-y-3">
              <a
                href="#features"
                className="text-gray-600 hover:text-[#0170BA] transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Features
              </a>
              <a
                href="#how-it-works"
                className="text-gray-600 hover:text-[#0170BA] transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                How It Works
              </a>
              <a
                href="#pricing"
                className="text-gray-600 hover:text-[#0170BA] transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Pricing
              </a>
              <a
                href="#testimonials"
                className="text-gray-600 hover:text-[#0170BA] transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Testimonials
              </a>
              <div className="pt-2 flex flex-col space-y-2">
                <button
                  data-navigation
                  data-navigation-target="/app"
                  className="text-[#0170BA] hover:text-[#0052A5] transition-colors py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Login
                </button>
                <button
                  data-navigation
                  data-navigation-target="/app"
                  className="bg-[#0170BA] hover:bg-[#0052A5] text-white px-4 py-2 rounded-md transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Get Started
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
