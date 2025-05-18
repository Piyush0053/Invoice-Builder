import React from 'react';
import { motion } from 'framer-motion';
import { Calculator, FileText, Mail, Clock, CreditCard, LineChart } from 'lucide-react';
import AnimatedSection from '../ui/AnimatedSection';

const FeatureCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}> = ({ icon, title, description, delay }) => {
  return (
    <AnimatedSection 
      className="group relative bg-white rounded-xl p-6 border border-gray-100 hover:shadow-xl transition-all duration-300 overflow-hidden"
      direction="up"
      duration={0.6}
      delay={delay}
    >
      {/* Animated background effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <motion.div 
        className="relative z-10"
        whileHover={{ y: -5 }}
        transition={{ type: 'spring', stiffness: 400, damping: 10 }}
      >
        <div className="bg-gradient-to-br from-[#0170BA] to-[#00A3FF] text-white w-14 h-14 rounded-xl flex items-center justify-center mb-5 shadow-lg">
          {icon}
        </div>
        <h3 className="text-xl font-semibold mb-3 text-gray-900 group-hover:text-[#0170BA] transition-colors">
          {title}
        </h3>
        <p className="text-gray-600 leading-relaxed">{description}</p>
      </motion.div>
    </AnimatedSection>
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
    <section id="features" className="py-24 px-6 bg-gradient-to-b from-white to-blue-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <AnimatedSection direction="up" duration={0.8} delay={0.1}>
            <motion.h2 
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600"
            >
              Powerful Features for Effortless Invoicing
            </motion.h2>
            <motion.p 
              className="text-xl text-gray-600 max-w-2xl mx-auto"
            >
              Everything you need to create, manage, and track professional invoices
            </motion.p>
          </AnimatedSection>
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
