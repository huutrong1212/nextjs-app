'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface AnimatedTextProps {
  children: string;
}

const AnimatedText: React.FC<AnimatedTextProps> = ({ children }) => {
  const chars = children.split('');

  return (
    <div className="inline-block">
      {chars.map((char: string, index: number) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            delay: index * 0.05,
            duration: 0.5,
            ease: 'easeOut',
          }}
        >
          {char}
        </motion.span>
      ))}
    </div>
  );
};

export default AnimatedText;
