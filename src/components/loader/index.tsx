'use client';

import React from 'react';
import { motion } from 'framer-motion';

const Loader = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <motion.div
        className="loader"
        style={{
          width: 'fit-content',
          fontWeight: 'bold',
          fontFamily: 'monospace',
          fontSize: '30px',
          overflow: 'hidden',
        }}
        animate={{
          clipPath: ['inset(0 3ch 0 0)', 'inset(0 -1ch 0 0)'],
        }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        <span className="first-letter">L</span>
        oading...
      </motion.div>
    </div>
  );
};

export default Loader;
