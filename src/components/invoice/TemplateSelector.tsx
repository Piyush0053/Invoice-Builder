import React from 'react';
import { motion } from 'framer-motion';
import { invoiceTemplates } from '../../data/templates';
import Card from '../ui/Card';

interface TemplateSelectorProps {
  selectedTemplate: string;
  onSelectTemplate: (templateId: string) => void;
}

const TemplateSelector: React.FC<TemplateSelectorProps> = ({
  selectedTemplate,
  onSelectTemplate
}) => {
  return (
    <Card title="Invoice Templates" subtitle="Choose a template for your invoice">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {invoiceTemplates.map((template) => (
          <motion.div
            key={template.id}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className={`relative rounded-lg overflow-hidden cursor-pointer border-2 transition-all ${
              selectedTemplate === template.id
                ? 'border-primary-500 shadow-md'
                : 'border-transparent hover:border-primary-200'
            }`}
            onClick={() => onSelectTemplate(template.id)}
          >
            <img
              src={template.previewImage}
              alt={template.name}
              className="w-full h-32 object-cover"
            />
            
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
              <div className="p-2 text-white">
                <p className="font-medium">{template.name}</p>
              </div>
            </div>
            
            {selectedTemplate === template.id && (
              <div className="absolute top-2 right-2 bg-primary-500 text-white rounded-full p-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </Card>
  );
};

export default TemplateSelector;