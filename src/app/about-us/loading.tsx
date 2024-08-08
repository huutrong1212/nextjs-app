import React from 'react';
import { Loader, Skeleton } from '@/components';
import { MainLayout } from '@/layouts';

const Loading = () => {
  return (
    <Loader />
    // <MainLayout>
    //   <div className="flex flex-col md:flex-row-reverse justify-between items-center container">
    //     <div className="w-full md:w-1/2">
    //       <Skeleton className="w-80 h-80 md:w-[560px] md:h-[560px]" />
    //     </div>
    //     <div className="flex flex-col md:w-1/2 gap-6">
    //       <Skeleton className="w-48 h-8" />
    //       <Skeleton className="w-60 h-10" />
    //       <Skeleton className="w-80 h-8" />
    //       <div className="flex flex-col gap-4">
    //         <Skeleton className="w-48 h-8" />
    //         <Skeleton className="w-40 h-8" />
    //         <Skeleton className="w-60 h-8" />
    //       </div>
    //       <div>
    //         <Skeleton className="w-32 h-10" />
    //       </div>
    //     </div>
    //   </div>
    // </MainLayout>
  );
};

export default Loading;
