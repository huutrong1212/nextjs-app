'use client';

import React from 'react';
import { motion, MotionProps } from 'framer-motion';

interface MotionDivProps extends MotionProps {
  className?: string;
  children: React.ReactNode;
  isInView: boolean;
}

const MotionDiv: React.FC<MotionDivProps> = ({ className, children, isInView, ...motionProps }) => {
  const animationProps = {
    opacity: isInView ? 1 : 0,
    y: isInView ? 0 : 20,
  };

  return (
    <motion.div
      className={className}
      animate={animationProps}
      initial={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.6, delay: 0 }}
      {...motionProps}
    >
      {children}
    </motion.div>
  );
};

export default MotionDiv;
