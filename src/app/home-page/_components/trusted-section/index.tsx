import DefaultLayout from '@/layouts/default';
import React from 'react';

const TrustedSection = () => {
  return (
    <DefaultLayout className='bg-white border-b'>
      <div id="trusted-content" className="container mx-auto text-center text-black">
        <h2 className="text-lg mb-4 font-semibold">TRUSTED BY TEAMS AT</h2>
        <div className="flex justify-center space-x-8 pointer-events-none">
          <img src="/images/upsplash.png" alt="Unsplash" className="h-12" />
          <img src="/images/notion.png" alt="Notion" className="h-12" />
          <img src="/images/intercom.png" alt="Intercom" className="h-12" />
          <img src="/images/descript.png" alt="Descript" className="h-12" />
          <img src="/images/grammarly.png" alt="Grammarly" className="h-12" />
        </div>
      </div>
    </DefaultLayout>
  );
};

export default TrustedSection;
