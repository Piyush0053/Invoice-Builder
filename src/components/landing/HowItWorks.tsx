import React from 'react';
import { motion } from 'framer-motion';
import { UserPlus, FilePlus, MailPlus, BarChart } from 'lucide-react';

const StepCard: React.FC<{
  icon: React.ReactNode;
  number: number;
  title: string;
  description: string;
  delay: number;
}> = ({ icon, number, title, description, delay }) => {
  return (
    <motion.div 
      className="flex flex-col items-center text-center"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
    >
      <div className="relative">
        <div className="w-16 h-16 bg-[#0170BA] rounded-full flex items-center justify-center text-white mb-4">
          {icon}
        </div>
        <div className="absolute -top-2 -right-2 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-[#0170BA] font-bold border-2 border-white">
          {number}
        </div>
      </div>
      <h3 className="text-xl font-semibold mb-2 text-gray-900">{title}</h3>
      <p className="text-gray-600 max-w-xs">{description}</p>
    </motion.div>
  );
};

const HowItWorks: React.FC = () => {
  const steps = [
    {
      icon: <UserPlus size={24} />,
      title: "Sign Up",
      description: "Create your account in seconds, no credit card required to get started with our free plan."
    },
    {
      icon: <FilePlus size={24} />,
      title: "Add Client",
      description: "Enter your client's details or import existing contacts to quickly create personalized invoices."
    },
    {
      icon: <MailPlus size={24} />,
      title: "Generate & Send",
      description: "Create a professional invoice with our templates and send it directly to your client via email."
    },
    {
      icon: <BarChart size={24} />,
      title: "Track Payments",
      description: "Monitor payment status, send reminders, and get insights into your cash flow."
    }
  ];

  return (
    <section id="how-it-works" className="py-20 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            How It Works
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Start creating professional invoices in four simple steps
          </motion.p>
        </div>

        <div className="relative">
          {/* Connection line */}
          <div className="hidden lg:block absolute top-20 left-0 right-0 h-1 bg-blue-100 z-0"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 relative z-10">
            {steps.map((step, index) => (
              <StepCard 
                key={index}
                icon={step.icon}
                number={index + 1}
                title={step.title}
                description={step.description}
                delay={0.1 + index * 0.1}
              />
            ))}
          </div>
        </div>

        <div className="mt-16 text-center">
          <motion.button
            onClick={() => {
              window.location.href = '/app';
            }}
            className="bg-[#0170BA] hover:bg-[#0052A5] text-white px-8 py-3 rounded-md text-lg font-medium transition-colors shadow-md"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Get Started Now
          </motion.button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
