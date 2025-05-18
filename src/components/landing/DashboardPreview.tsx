import React from 'react';
import { motion } from 'framer-motion';

const DashboardPreview: React.FC = () => {
  return (
    <section className="py-20 px-6 bg-gradient-to-b from-white to-blue-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Preview Your Dashboard
          </motion.h2>
          <motion.p
            className="text-xl text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            See how easy it is to create and manage your invoices
          </motion.p>
        </div>

        <motion.div
          className="relative shadow-2xl rounded-xl overflow-hidden mx-auto max-w-5xl"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          {/* Dashboard Header */}
          <div className="bg-[#0170BA] p-4 text-white">
            <div className="flex items-center justify-between">
              <div className="text-xl font-bold">Invoice-Builder Dashboard</div>
              <div className="flex items-center space-x-4">
                <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full"></div>
                <div className="w-24 h-6 bg-white bg-opacity-20 rounded-md"></div>
              </div>
            </div>
          </div>

          {/* Dashboard Content */}
          <div className="bg-white p-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {[
                { label: 'Total Invoices', value: '24' },
                { label: 'Paid', value: '$4,250.00' },
                { label: 'Outstanding', value: '$1,840.50' }
              ].map((stat, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                  <div className="text-gray-500 text-sm mb-1">{stat.label}</div>
                  <div className="text-gray-900 text-2xl font-bold">{stat.value}</div>
                </div>
              ))}
            </div>

            {/* Recent Invoices Table */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <div className="text-lg font-semibold text-gray-900">Recent Invoices</div>
                <div className="w-32 h-8 bg-blue-100 rounded-md"></div>
              </div>
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      {['Invoice #', 'Client', 'Amount', 'Status', 'Date', 'Actions'].map((header, index) => (
                        <th key={index} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {[1, 2, 3].map((row) => (
                      <tr key={row}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="w-20 h-5 bg-gray-100 rounded"></div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="w-32 h-5 bg-gray-100 rounded"></div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="w-24 h-5 bg-gray-100 rounded"></div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="w-16 h-5 bg-green-100 rounded"></div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="w-24 h-5 bg-gray-100 rounded"></div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="w-20 h-5 bg-blue-100 rounded"></div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <button
            onClick={() => {
              window.location.href = '/app';
            }}
            className="bg-[#0170BA] hover:bg-[#0052A5] text-white px-8 py-3 rounded-md text-lg font-medium transition-colors shadow-md"
          >
            Try It Now
          </button>
          <p className="text-gray-600 mt-4">
            No credit card required to start your free trial
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default DashboardPreview;
