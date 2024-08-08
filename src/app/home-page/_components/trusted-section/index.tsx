'use client';

import { MotionDiv, Typography } from '@/components';
import Image from 'next/image';
import React from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const trustedLogos = [
  { src: '/images/upsplash.png', alt: 'Unsplash' },
  { src: '/images/notion.png', alt: 'Notion' },
  { src: '/images/intercom.png', alt: 'Intercom' },
  { src: '/images/descript.png', alt: 'Descript' },
  { src: '/images/grammarly.png', alt: 'Grammarly' },
];

interface TrustedSectionProps {
  className?: string;
}

const TrustedSection = ({ className }: TrustedSectionProps) => {
  const [trustedRef, trustedInView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  // Animation variants for smoother horizontal scrolling
  const scrollVariants = {
    animate: {
      x: ['0%', '-50%'],
      transition: {
        x: {
          repeat: Infinity,
          repeatType: 'loop',
          duration: 30,
          ease: 'linear',
        },
      },
    },
  };

  // Duplicate the logos to create a seamless effect
  const duplicatedLogos = [...trustedLogos, ...trustedLogos];

  return (
    <section
      className={cn('bg-white border-b py-16 md:py-20 lg:py-24 relative', className)}
      ref={trustedRef}
    >
      <MotionDiv
        isInView={trustedInView}
        className="container mx-auto text-center text-black relative"
      >
        <Typography variant="h3" className="mb-12 sm:mb-12 text-2xl">
          TRUSTED BY TEAMS AT
        </Typography>
        <div className="relative overflow-hidden">
          <div className="flex space-x-12 mask-container">
            <motion.div className="flex space-x-12" variants={scrollVariants} animate="animate">
              {duplicatedLogos.map((logo, index) => (
                <motion.div
                  key={index}
                  className="flex-none"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: index * 0.2 }}
                >
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    width={500}
                    height={500}
                    className="h-[38px] w-auto pointer-events-none"
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </MotionDiv>
    </section>
  );
};

export default TrustedSection;
