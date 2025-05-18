import React from 'react';
import { motion } from 'framer-motion';

const Hero: React.FC = () => {
  return (
    <section className="bg-gradient-to-b from-blue-50 to-white py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          {/* Hero Content */}
          <motion.div 
            className="lg:w-1/2 mb-10 lg:mb-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Create Professional Invoices in Seconds
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-lg">
              Streamline your billing workflow with our intuitive invoice generator. Built for freelancers, small businesses, and entrepreneurs.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <motion.button
                onClick={() => {
                  window.location.href = '/app';
                }}
                className="bg-[#0170BA] hover:bg-[#0052A5] text-white px-8 py-3 rounded-md text-lg font-medium transition-colors shadow-md"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get Started
              </motion.button>
              <motion.button
                onClick={() => {
                  window.location.href = '/app';
                }}
                className="border border-[#0170BA] text-[#0170BA] hover:bg-blue-50 px-8 py-3 rounded-md text-lg font-medium transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Sign In
              </motion.button>
            </div>
          </motion.div>

          {/* Hero Image */}
          <motion.div 
            className="lg:w-1/2"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-white rounded-lg shadow-xl p-4 transform rotate-1 max-w-xl mx-auto">
              <div className="bg-[#0170BA] text-white py-3 px-4 rounded-t-md">
                <div className="text-lg font-medium">Professional Invoice</div>
              </div>
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between mb-6">
                  <div>
                    <div className="text-xl font-bold mb-1">Invoice #1234</div>
                    <div className="text-gray-500">May 18, 2025</div>
                  </div>
                  <div className="text-right">
                    <div className="text-gray-600 mb-1">Due Date</div>
                    <div className="font-medium">June 1, 2025</div>
                  </div>
                </div>
                <div className="space-y-3">
                  {[1, 2, 3].map((item) => (
                    <div key={item} className="flex justify-between py-2 border-b border-gray-100">
                      <div className="w-1/2 bg-gray-100 h-4 rounded"></div>
                      <div className="w-1/6 bg-gray-100 h-4 rounded"></div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 flex justify-end">
                  <div className="w-1/3 bg-[#0170BA] h-10 rounded"></div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
