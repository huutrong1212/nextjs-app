'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import React from 'react';

interface PageWrapperProps {
  children: React.ReactNode;
}

const PageWrapper: React.FC<PageWrapperProps> = ({ children }) => {
  const { scrollYProgress } = useScroll();

  const yProgress = useTransform(scrollYProgress, [0, 0.1], ['20%', '0%']);
  const opacityProgress = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <motion.div
      style={{
        opacity: opacityProgress,
        y: yProgress,
      }}
      transition={{ duration: 1, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
};

export default PageWrapper;
