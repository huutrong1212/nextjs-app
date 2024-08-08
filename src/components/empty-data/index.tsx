'use client';

import { NotFoundIcon } from '@/public/icons';
import React from 'react';

const EmptyData: React.FC = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center text-sm">
      <NotFoundIcon />
      <p className="text-shadow-neutral70 text-xl text-center mt-8 font-bold">No data</p>
    </div>
  );
};

export default EmptyData;
