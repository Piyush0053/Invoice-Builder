import React from 'react';
import { Twitter, Facebook, Instagram, Linkedin, Github } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold text-[#0170BA] mb-4">Invoice-Builder</h3>
            <p className="text-gray-600 mb-4">
              Create professional invoices in seconds with our intuitive invoice generator.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-[#0170BA] transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-[#0170BA] transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-[#0170BA] transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-[#0170BA] transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-[#0170BA] transition-colors">
                <Github size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Product</h3>
            <ul className="space-y-2">
              <li><a href="#features" className="text-gray-600 hover:text-[#0170BA] transition-colors">Features</a></li>
              <li><a href="#pricing" className="text-gray-600 hover:text-[#0170BA] transition-colors">Pricing</a></li>
              <li><a href="#testimonials" className="text-gray-600 hover:text-[#0170BA] transition-colors">Testimonials</a></li>
              <li><a href="#" className="text-gray-600 hover:text-[#0170BA] transition-colors">FAQ</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Support</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-[#0170BA] transition-colors">Help Center</a></li>
              <li><a href="#" className="text-gray-600 hover:text-[#0170BA] transition-colors">Contact Us</a></li>
              <li><a href="#" className="text-gray-600 hover:text-[#0170BA] transition-colors">API Documentation</a></li>
              <li><a href="#" className="text-gray-600 hover:text-[#0170BA] transition-colors">Status</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Legal</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-[#0170BA] transition-colors">Terms of Service</a></li>
              <li><a href="#" className="text-gray-600 hover:text-[#0170BA] transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-600 hover:text-[#0170BA] transition-colors">Cookie Policy</a></li>
              <li><a href="#" className="text-gray-600 hover:text-[#0170BA] transition-colors">Security</a></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600 text-center md:text-left mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Invoice-Builder. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center space-x-4">
            <a href="#" className="text-gray-600 hover:text-[#0170BA] transition-colors text-sm">
              Terms
            </a>
            <a href="#" className="text-gray-600 hover:text-[#0170BA] transition-colors text-sm">
              Privacy
            </a>
            <a href="#" className="text-gray-600 hover:text-[#0170BA] transition-colors text-sm">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
