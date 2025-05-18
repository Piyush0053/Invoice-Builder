import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

type TestimonialProps = {
  quote: string;
  author: string;
  role: string;
  company: string;
  delay: number;
};

const Testimonial: React.FC<TestimonialProps> = ({ quote, author, role, company, delay }) => {
  return (
    <motion.div
      className="bg-white p-6 rounded-lg shadow-md border border-gray-100"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
    >
      <div className="flex mb-4">
        {[...Array(5)].map((_, i) => (
          <Star key={i} size={20} className="fill-yellow-400 text-yellow-400 mr-1" />
        ))}
      </div>
      <p className="text-gray-700 mb-6 italic">"{quote}"</p>
      <div>
        <p className="font-semibold text-gray-900">{author}</p>
        <p className="text-gray-600 text-sm">{role}, {company}</p>
      </div>
    </motion.div>
  );
};

const Testimonials: React.FC = () => {
  const testimonials = [
    {
      quote: "Invoice-Builder has transformed how we handle our billing process. What used to take hours now takes minutes. The UI is intuitive and the templates are professional.",
      author: "Sarah Johnson",
      role: "Founder",
      company: "Design Studio LLC"
    },
    {
      quote: "As a freelancer, keeping track of invoices was always a hassle. With Invoice-Builder, I can create, send, and track payments all in one place. Highly recommended!",
      author: "Michael Chen",
      role: "Web Developer",
      company: "Freelance"
    },
    {
      quote: "The automated tax calculations and recurring invoice features have saved our accounting team so much time. Worth every penny for small businesses like ours.",
      author: "Amanda Rodriguez",
      role: "Operations Manager",
      company: "GreenTech Solutions"
    }
  ];

  const logos = [
    'Acme Inc.',
    'TechCorp',
    'GlobalMedia',
    'EcoSolutions',
    'ProServices'
  ];

  return (
    <section id="testimonials" className="py-20 px-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            What Our Customers Say
          </motion.h2>
          <motion.p
            className="text-xl text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Join thousands of satisfied users who have simplified their invoicing
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {testimonials.map((testimonial, index) => (
            <Testimonial
              key={index}
              quote={testimonial.quote}
              author={testimonial.author}
              role={testimonial.role}
              company={testimonial.company}
              delay={0.1 + index * 0.1}
            />
          ))}
        </div>

        <motion.div
          className="mt-12 pt-12 border-t border-gray-200"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-center text-gray-500 mb-8">Trusted by companies worldwide</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            {logos.map((logo, index) => (
              <div key={index} className="text-gray-400 font-semibold text-xl">
                {logo}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
