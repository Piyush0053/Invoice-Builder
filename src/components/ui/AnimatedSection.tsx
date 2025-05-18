import React, { ReactNode, useEffect, useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';

type AnimationDirection = 'up' | 'down' | 'left' | 'right' | 'none';
type EasingFunction = [number, number, number, number];

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  direction?: AnimationDirection;
  distance?: number;
  threshold?: number;
  once?: boolean;
  easing?: EasingFunction;
  as?: keyof JSX.IntrinsicElements;
}

// Cluely's signature easing function
const cluelyEase: EasingFunction = [0.16, 1, 0.3, 1];

// Cluely-style animations with smooth, subtle transitions
export const AnimatedSection: React.FC<AnimatedSectionProps> = ({
  children,
  className = '',
  delay = 0,
  duration = 0.8,
  direction = 'up',
  distance = 24,
  threshold = 0.15,
  once = true,
  easing = cluelyEase,
  as: Component = 'div',
}) => {
  const controls = useAnimation();
  const ref = useRef<HTMLDivElement>(null);
  
  // Use Framer Motion's useInView for better performance
  const isInView = useInView(ref, {
    amount: threshold,
    once,
  });

  // Animation variants
  const variants = {
    hidden: {
      opacity: 0,
      ...(direction === 'up' && { y: distance }),
      ...(direction === 'down' && { y: -distance }),
      ...(direction === 'left' && { x: distance }),
      ...(direction === 'right' && { x: -distance }),
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration,
        delay,
        ease: easing,
      },
    },
  };

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [controls, isInView]);

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={controls}
      variants={variants}
      viewport={{ once, margin: `${threshold * 100}% 0px` }}
      style={{
        willChange: 'opacity, transform',
      }}
      as={Component}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedSection;
