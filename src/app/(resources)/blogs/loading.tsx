import { Loader, Skeleton } from '@/components';
import React from 'react';

const Loading = () => {
  return (
    <Loader />
    // <MainLayout>
    //   <div className="grid grid-cols-1 md:grid-cols-3 gap-x-20 gap-y-10">
    //     {Array.from({ length: 6 }, (_, index) => (
    //       <div key={index} className="flex-shrink-0 w-80 rounded-lg overflow-hidden">
    //         <Skeleton
    //           className="rounded-lg bg-muted"
    //           style={{ aspectRatio: '16/9', width: '100%' }}
    //         />
    //         <div className="mt-4">
    //           <Skeleton className="rounded-lg bg-muted h-6 w-full mb-2" />
    //           <Skeleton className="rounded-lg bg-muted h-16 w-full mb-2" />
    //           <Skeleton className="rounded-lg bg-muted h-6 w-20" />
    //         </div>
    //       </div>
    //     ))}
    //   </div>
    // </MainLayout>
  );
};

export default Loading;
