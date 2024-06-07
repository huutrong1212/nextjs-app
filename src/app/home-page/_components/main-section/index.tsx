import { Button } from '@/components/index';
import React from 'react';

const MainSection = () => {
  return (
    <section className="bg-gray-50 p-8">
      <div id="main-content" className="container mx-auto flex flex-col md:flex-row items-center">
        <div className="md:w-1/2">
          <div className="w-9/12 pb-8">
            <h1 className="text-[54px] font-bold text-black mb-4">
              Turn your assessment plans into products
            </h1>
            <img src="/images/curved_wave.png" alt="Curved Wave" className="h-12" />
          </div>
          <div className='w-9/12'>
            <p className="text-lg text-gray-700 mb-6">
              Let's make your work more organize and easily using the Taskio Dashboard with many of
              the latest features in managing work every day.
            </p>
            <Button type="button">Get started</Button>
          </div>
        </div>
        <div className="md:w-1/2 mt-8 md:mt-0 pointer-events-none">
          <img src="/images/creadit-card.png" alt="Dashboard" className="w-full" />
        </div>
      </div>
    </section>
  );
};

export default MainSection;
