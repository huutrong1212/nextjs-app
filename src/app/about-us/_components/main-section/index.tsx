'use client';

import React from 'react';
import Image from 'next/image';
import { Typography } from '@/components';
import { MainLayout } from '@/layouts';
import { motion } from 'framer-motion';

const MainSection = () => {
  return (
    <MainLayout className="py-6 sm:py-10 lg:pb-0 lg:pt-14">
      <div
        id="main-content"
        className="mx-auto flex flex-col md:flex-row items-center sm:gap-16 lg:gap-20"
      >
        <div className="order-2 md:order-1 flex-1 mt-12 sm:mt-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Typography
              className="mb-[40px] font-[600] sm:text-[42px] lg:text-[54px] sm:leading-[56px] lg:leading-[70px]"
              variant="h1"
            >
              Express the power of your ideas with Edtechtools
            </Typography>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Typography
              className="text-base lg:text-[20px] lg:leading-[28px] font-normal"
              variant="h4"
            >
              Let's make your work more organize and easily using the Taskio Dashboard with many of
              the latest featuresin managing work every day.
            </Typography>
          </motion.div>
        </div>
        <div className="order-1 sm:order-2 flex-1">
          <motion.div whileHover={{ rotate: -5 }}>
            <Image
              src="/images/solution_3.png"
              alt="Solutions"
              className="w-full"
              width={560}
              height={560}
            />
          </motion.div>
        </div>
      </div>
    </MainLayout>
  );
};

export default MainSection;
