import React from 'react';
import { Category, Skeleton } from '@/components';
import { MainLayout } from '@/layouts';

interface SolutionItemProps {
  data: any[];
}

const SolutionItem: React.FC<SolutionItemProps> = ({ data }) => {
  const isLoading = !data || data.length === 0;

  return (
    <MainLayout>
      <div className="flex flex-col lg:gap-20 gap-16">
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
          data.map((item, index) => <Category key={index} item={item} />)
        )}
      </div>
    </MainLayout>
  );
};

export default SolutionItem;
