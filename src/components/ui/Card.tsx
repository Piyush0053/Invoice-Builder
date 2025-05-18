import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: ReactNode;
  className?: string;
  title?: string;
  subtitle?: string;
  footer?: ReactNode;
  hover?: boolean;
}

const Card: React.FC<CardProps> = ({
  children,
  className = '',
  title,
  subtitle,
  footer,
  hover = false
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`bg-white rounded-xl shadow-card overflow-hidden ${hover ? 'hover:shadow-lg transition-shadow duration-300' : ''} ${className}`}
    >
      {(title || subtitle) && (
        <div className="px-6 py-4 border-b border-secondary-200">
          {title && <h3 className="text-lg font-semibold text-secondary-800">{title}</h3>}
          {subtitle && <p className="mt-1 text-sm text-secondary-500">{subtitle}</p>}
        </div>
      )}
      
      <div className="p-6">{children}</div>
      
      {footer && (
        <div className="px-6 py-4 bg-secondary-50 border-t border-secondary-200">
          {footer}
        </div>
      )}
    </motion.div>
  );
};

export default Card;