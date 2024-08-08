'use client';

import { Category, MotionDiv, Skeleton } from '@/components';

import { MainLayout } from '@/layouts';
import React from 'react';
import { useInView } from 'react-intersection-observer';

interface CategoriesProps {
  data: any[];
  className?: string;
}

const Categories: React.FC<CategoriesProps> = ({ data, className }) => {
  const isLoading = !data || data.length === 0;
  const [categoriesRef, categoriesInView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <MainLayout className={className} ref={categoriesRef}>
      <MotionDiv
        className="flex flex-col gap-16 sm:gap-20 lg:gap-[120px]"
        isInView={categoriesInView}
      >
        {isLoading ? (
          <div className="flex flex-col md:flex-row-reverse justify-between items-center gap-20">
            <Skeleton className="flex-1 h-[560px] w-full md:w-1/2" />
            <div className="flex flex-col flex-1 gap-6">
              <Skeleton className="h-8 w-1/4" />
              <Skeleton className="h-12 w-2/4" />
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-10 w-1/4 mt-4" />
            </div>
          </div>
        ) : (
          data.map((category, index) => <Category key={index} item={category} />)
        )}
      </MotionDiv>
    </MainLayout>
  );
};

export default Categories;
