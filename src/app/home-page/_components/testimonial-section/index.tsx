'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { QuoteIcon } from '@/public/icons';
import { MotionDiv } from '@/components';
import { useInView } from 'react-intersection-observer';

const testimonials = [
  {
    text: '"Since I started engaging with OplaCRM, my task has been to start with the \'egg dish\' every day."',
    author: 'Ms. Cao Thi Bich Lieu, Sales Director, Faslink JSC',
  },
  {
    text: '"OplaCRM has significantly improved our team\'s productivity and efficiency."',
    author: 'Mr. John Doe, CEO, ExampleCorp',
  },
  {
    text: '"The intuitive design and robust features of OplaCRM make it a game changer for our sales department."',
    author: 'Ms. Jane Smith, Head of Sales, TechSolutions',
  },
];

const Testimonial = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const [testimonialRef, testimonialInView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <section
      className="bg-yellow-6 pt-[30px] lg:pt-[60px] pb-[60px] lg:pb-[120px]"
      ref={testimonialRef}
    >
      <MotionDiv isInView={testimonialInView} className="container mx-auto">
        <div className="flex items-center justify-between">
          <QuoteIcon className="w-10 md:w-14 h-10 md:h-14" />
          <div className="flex space-x-4">
            <button className="p-2" onClick={handlePrevious}>
              <ChevronRight className="w-6 h-6 transform rotate-180" />
            </button>
            <button className="p-2" onClick={handleNext}>
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mt-4 flex flex-col items-start"
        >
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="font-semibold text-2xl leading-10 mb-4"
          >
            {testimonials[currentIndex].text}
          </motion.div>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
            {testimonials[currentIndex].author}
          </motion.p>
        </motion.div>
      </MotionDiv>
    </section>
  );
};

export default Testimonial;
