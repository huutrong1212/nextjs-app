'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Button, CheckedItem, Typography } from '@/components';
import { Routes } from '@/types/routes';
import Link from 'next/link';

interface Plan {
  name: string;
  price: string | number;
  features?: string[];
  onContactSales?: () => void;
}

interface PricingCardProps {
  plan: Plan;
  layoutType?: 'outline' | 'noneOutline';
}

const PricingCard: React.FC<PricingCardProps> = ({ plan, layoutType = 'outline' }) => {
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: 'easeOut' } },
    hover: { scale: 1.05 },
  };

  return (
    <>
      {layoutType === 'outline' ? (
        <motion.div
          className={
            layoutType === 'outline'
              ? 'rounded-lg shadow-lg px-6 py-8 items-start border border-grey-5 flex flex-col gap-6 w-full h-full'
              : 'flex flex-col gap-4'
          }
          variants={containerVariants}
          initial="hidden"
          whileHover="hover"
          animate="visible"
          transition={{ type: 'spring', stiffness: 300 }}
        >
          <div className="flex flex-col gap-8 w-full">
            <Typography variant="h3">{plan.name}</Typography>
            <div className="flex items-baseline">
              <p className="text-[42px] leading-[56px] font-semibold">{plan.price}</p>
              <span className="text-sm text-grey-8 ml-1">/month</span>
            </div>
            <Button className="flex-grow" asChild>
              <Link href={Routes.contactSales}>Contact sales</Link>
            </Button>
          </div>
          <ul className="text-left space-y-4">
            <li>
              <Typography variant="h5">What you can do</Typography>
            </li>
            {plan.features?.map((feature, index) => (
              <li key={index} className="flex items-center">
                <CheckedItem key={index} content={feature} />
              </li>
            ))}
          </ul>
        </motion.div>
      ) : (
        <div className="flex flex-col gap-2">
          <Typography variant="h4" className="text-black">
            {plan.name}
          </Typography>
          <Typography variant="h5">${plan.price}/month</Typography>
          <Button className="text-primary font-bold mx-5" typeButton="main" variant="secondary">
            <Link href={Routes.contactSales}>Contact sales</Link>
          </Button>
        </div>
      )}
    </>
  );
};

export default PricingCard;
