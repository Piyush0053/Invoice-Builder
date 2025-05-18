import React, { ReactNode } from 'react';
import { motion, Variants } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  distance?: number;
}

// Cluely-style animations with smooth, subtle transitions
export const AnimatedSection: React.FC<AnimatedSectionProps> = ({
  children,
  className = '',
  delay = 0,
  duration = 0.7,
  direction = 'up',
  distance = 30,
}) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
    rootMargin: "-50px 0px",
  });

  const getDirectionVariants = (): Variants => {
    let initial = { opacity: 0 };
    
    switch (direction) {
      case 'up':
        initial = { ...initial, y: distance };
        break;
      case 'down':
        initial = { ...initial, y: -distance };
        break;
      case 'left':
        initial = { ...initial, x: distance };
        break;
      case 'right':
        initial = { ...initial, x: -distance };
        break;
      default:
        break;
    }
    
    return {
      hidden: initial,
      visible: { 
        opacity: 1, 
        y: 0, 
        x: 0, 
        transition: { 
          duration,
          delay,
          ease: [0.25, 0.1, 0.25, 1.0], // Smooth cubic-bezier easing like cluely
        } 
      },
    };
  };

  const variants = getDirectionVariants();

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedSection;
