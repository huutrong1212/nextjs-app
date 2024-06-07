import React from 'react';
import {
  Categories,
  MainSection,
  Testimonial,
  TrustedSection,
} from '@/app/home-page/_components/index';

const HomePage = () => {
  return (
    <>
      <MainSection />
      <TrustedSection />
      <Categories />
      <Testimonial />
    </>
  );
};

export default HomePage;
