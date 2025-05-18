import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

type PricingPlan = {
  name: string;
  price: { monthly: string; yearly: string };
  description: string;
  features: string[];
  isPopular?: boolean;
  buttonText: string;
};

const PricingCard: React.FC<{
  plan: PricingPlan;
  isYearly: boolean;
  delay: number;
}> = ({ plan, isYearly, delay }) => {
  return (
    <motion.div
      className={`bg-white rounded-lg shadow-md border ${
        plan.isPopular ? 'border-[#0170BA]' : 'border-gray-200'
      } p-6 flex flex-col h-full`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
    >
      {plan.isPopular && (
        <div className="bg-[#0170BA] text-white text-sm font-medium px-3 py-1 rounded-full self-start mb-4">
          Most Popular
        </div>
      )}
      <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
      <div className="mb-4">
        <span className="text-4xl font-bold text-gray-900">
          {isYearly ? plan.price.yearly : plan.price.monthly}
        </span>
        <span className="text-gray-600 ml-2">
          {isYearly ? '/year' : '/month'}
        </span>
      </div>
      <p className="text-gray-600 mb-6">{plan.description}</p>
      
      <ul className="space-y-3 mb-8 flex-grow">
        {plan.features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <span className="mr-2 text-[#0170BA] mt-1">
              <Check size={16} />
            </span>
            <span className="text-gray-600">{feature}</span>
          </li>
        ))}
      </ul>
      
      <button
        data-navigation
        data-navigation-target="/app"
        className={`${
          plan.isPopular
            ? 'bg-[#0170BA] hover:bg-[#0052A5] text-white'
            : 'border border-[#0170BA] text-[#0170BA] hover:bg-blue-50'
        } px-6 py-3 rounded-md text-center transition-colors w-full font-medium`}
      >
        {plan.buttonText}
      </button>
    </motion.div>
  );
};

const Pricing: React.FC = () => {
  const [isYearly, setIsYearly] = useState(false);
  
  const plans: PricingPlan[] = [
    {
      name: 'Free',
      price: { monthly: '$0', yearly: '$0' },
      description: 'Perfect for freelancers just getting started',
      features: [
        'Up to 5 invoices per month',
        'Basic invoice templates',
        'PDF export',
        'Email sending',
        'Client management',
      ],
      buttonText: 'Get Started',
    },
    {
      name: 'Pro',
      price: { monthly: '$15', yearly: '$144' },
      description: 'Ideal for growing businesses',
      features: [
        'Unlimited invoices',
        'Premium templates',
        'Recurring invoices',
        'Automated reminders',
        'Custom branding',
        'Multiple tax rates',
        'Payment tracking',
      ],
      isPopular: true,
      buttonText: 'Choose Pro',
    },
    {
      name: 'Enterprise',
      price: { monthly: '$39', yearly: '$399' },
      description: 'Advanced features for larger teams',
      features: [
        'Everything in Pro',
        'Team accounts',
        'Role-based permissions',
        'API access',
        'Advanced analytics',
        'Dedicated support',
        'Custom integrations',
      ],
      buttonText: 'Contact Sales',
    },
  ];

  return (
    <section id="pricing" className="py-20 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Simple, Transparent Pricing
          </motion.h2>
          <motion.p
            className="text-xl text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Choose the plan that fits your business needs
          </motion.p>
          
          <motion.div
            className="flex items-center justify-center mt-8 space-x-3"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <span className={`text-${isYearly ? 'gray-600' : '[#0170BA]'} font-medium`}>Monthly</span>
            <button
              className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200"
              onClick={() => setIsYearly(!isYearly)}
            >
              <span className="sr-only">Toggle yearly billing</span>
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                  isYearly ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
            <span className={`text-${isYearly ? '[#0170BA]' : 'gray-600'} font-medium`}>
              Yearly <span className="text-green-500 text-sm">(Save 20%)</span>
            </span>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <PricingCard
              key={index}
              plan={plan}
              isYearly={isYearly}
              delay={0.1 + index * 0.1}
            />
          ))}
        </div>
        
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <p className="text-gray-600">
            All plans come with a 14-day free trial. No credit card required to start.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Pricing;
