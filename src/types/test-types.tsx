import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import toast from 'react-hot-toast';

export const TestComponent: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      onClick={() => toast.success('TypeScript is working!')}
      style={{
        padding: '1rem',
        background: '#0170BA',
        color: 'white',
        borderRadius: '8px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
      }}
    >
      <Check size={20} />
      <span>Click to test TypeScript</span>
    </motion.div>
  );
};
