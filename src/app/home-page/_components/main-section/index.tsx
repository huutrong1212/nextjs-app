'use client';

import React from 'react';
import Image from 'next/image';
import BackgroundSvg from '@/public/background.svg';
import { Button, Typography } from '@/components';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Routes } from '@/types/routes';
import { MainLayout } from '@/layouts';

const MainSection = () => {
  const router = useRouter();

  function handleGetStarted() {
    router.push(Routes.solutions);
  }

  return (
    <MainLayout
      className="py-6 sm:py-10 lg:pb-0 lg:py-14"
      style={{
        backgroundImage: `url(${BackgroundSvg.src})`,
        width: '100%',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
      }}
    >
      <div
        id="main-content"
        className="mx-auto flex flex-col md:flex-row items-center sm:gap-16 lg:gap-20"
      >
        <div className="order-2 md:order-1 flex-1 mt-12 sm:mt-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8 md:mb-12 lg:mb-16"
          >
            <Typography className="mb-8" variant="h1">
              Turn your assessment plans into products
            </Typography>
            <Image
              src="/images/curved_wave.png"
              alt="Curved Wave"
              className="h-[26px]"
              width={500}
              height={500}
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-10"
          >
            <Typography
              className="text-base md:text-[20px] md:leading-[28px] font-normal"
              variant="h4"
            >
              Let&apos;s make your work more organized and easily using the Taskio Dashboard with
              many of the latest features in managing work every day.
            </Typography>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Button type="button" className="w-full lg:w-1/5 md:w-2/5" onClick={handleGetStarted}>
              Get started
            </Button>
          </motion.div>
        </div>
        <div className="order-1 sm:order-2 flex-1">
          <motion.div whileHover={{ rotate: -5 }}>
            <Image
              src="/images/creadit-card.png"
              alt="Credit Card"
              className="w-full"
              width={500}
              height={500}
            />
          </motion.div>
        </div>
      </div>
    </MainLayout>
  );
};

export default MainSection;
