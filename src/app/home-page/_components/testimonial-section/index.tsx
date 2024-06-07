import DefaultLayout from '@/layouts/default';
import React from 'react';

const Testimonial = () => {
  return (
    <DefaultLayout className="bg-yellow-6">
      <div className=" flex flex-col">
        <div className="font-semibold text-2xl leading-10 mb-4">
          "Since I started engaging with OplaCRM, my task has been to start with the 'egg dish'
          every day."
        </div>
        <p>Ms. Cao Thi Bich Lieu, Sales Director, Faslink JSC</p>
      </div>
    </DefaultLayout>
  );
};

export default Testimonial;
