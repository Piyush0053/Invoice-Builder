import React from 'react';
import { motion } from 'framer-motion';
import { Calculator, FileText, Mail, Clock, CreditCard, LineChart } from 'lucide-react';

const FeatureCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}> = ({ icon, title, description, delay }) => {
  return (
    <motion.div 
      className="bg-white rounded-lg shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
    >
      <div className="bg-blue-100 text-[#0170BA] w-12 h-12 rounded-lg flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-3 text-gray-900">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </motion.div>
  );
};

const Features: React.FC = () => {
  const features = [
    {
      icon: <Calculator size={24} />,
      title: "Automated Tax Calculations",
      description: "Automatically calculate taxes based on location and rates, ensuring compliance with local regulations."
    },
    {
      icon: <FileText size={24} />,
      title: "Professional Templates",
      description: "Choose from a variety of professionally designed invoice templates to match your brand."
    },
    {
      icon: <Mail size={24} />,
      title: "PDF Export & Email",
      description: "Export invoices as PDF and email them directly to clients with a single click."
    },
    {
      icon: <Clock size={24} />,
      title: "Recurring Invoices",
      description: "Set up recurring invoices for regular clients and automate your billing process."
    },
    {
      icon: <CreditCard size={24} />,
      title: "Flexible Discounts",
      description: "Apply percentage or fixed-amount discounts to individual items or the entire invoice."
    },
    {
      icon: <LineChart size={24} />,
      title: "Financial Insights",
      description: "Track payments, outstanding balances, and get insights into your business finances."
    }
  ];

  return (
    <section id="features" className="py-20 px-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Powerful Features for Effortless Invoicing
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Everything you need to create, manage, and track professional invoices
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard 
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              delay={0.1 + index * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
