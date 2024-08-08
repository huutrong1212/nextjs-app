'use client';

import React from 'react';
import { Category, MotionDiv } from '@/components';
import { useInView } from 'react-intersection-observer';
import { MainLayout } from '@/layouts';

interface CategoriesSectionProps {
  categories: Array<{
    imageSrc: string;
    title: string;
    description: string;
    reverse?: boolean;
    subtitle?: string;
  }>;
}

const CategoriesSection: React.FC<CategoriesSectionProps> = ({ categories }) => {
  const [categoriesRef, categoriesInView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <MainLayout ref={categoriesRef}>
      <MotionDiv isInView={categoriesInView} className="flex flex-col lg:gap-[120px] gap-20">
        {categories.map((category, index) => (
          <Category key={index} item={category} />
        ))}
      </MotionDiv>
    </MainLayout>
  );
};

export default CategoriesSection;
