'use client';

import { CoreValueItem, MotionDiv, Typography } from '@/components';

import React from 'react';
import { useInView } from 'react-intersection-observer';

interface CoreValuesSectionProps {
  title: string;
  description: string;
  items: Array<{
    title: string;
    content: string;
    imageUrl: string;
  }>;
}

const CoreValuesSection: React.FC<CoreValuesSectionProps> = ({ title, description, items }) => {
  const [coreValuesRef, coreValuesInView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <section className="container mb-16 sm:mb-20 lg:mb-[120px]" ref={coreValuesRef}>
      <MotionDiv isInView={coreValuesInView}>
        <div className="flex flex-col gap-6 text-center items-center">
          <Typography variant="h2">{title}</Typography>
          <Typography variant="h5" className="font-normal w-full sm:max-w-[600px]">
            {description}
          </Typography>
        </div>
        <div className="mt-10 lg:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {items.map((value, index) => (
            <CoreValueItem
              key={index}
              content={value.content}
              imageUrl={value.imageUrl}
              title={value.title}
            />
          ))}
        </div>
      </MotionDiv>
    </section>
  );
};

export default CoreValuesSection;
