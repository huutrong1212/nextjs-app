import CategoriesSection from './_components/categories';
import CoreValuesSection from './_components/core-values';
import MainSection from './_components/main-section';
import React from 'react';
import { metadataConfig } from '@/config/metadata';

export const metadata = metadataConfig.about;
const dataAboutUs = {
  categories: [
    {
      imageSrc: '/images/structure.png',
      title: 'Express the power of your ideas with Edtechtools',
      description:
        'Let&apos; make your work more organize and easily using the Taskio Dashboard with many of the latest featuresin managing work every day.',
    },
    {
      reverse: true,
      subtitle: 'Who we are',
      imageSrc: '/images/key.png',
      title: 'We&apos; re inspiring',
      description:
        'We gather talent and inspiration from creatives all around the world – all in one place – and looove it when we help you make your great ideas happen. We believe in the power of good design and community. Our spirit is restless, and our inner joyful rebel says: Don&apos;t follow all the conventions; rewrite them.',
    },
  ],
  coreValues: {
    title: 'Core values',
    description:
      'Yeah, that’s right. We talk to each other openly and honestly. Why? Because we care about working in an environment where everyone communicates directly and respectfully.',
    items: [
      {
        title: 'We walk and then we run',
        content:
          'We like to take it one step at a time. We explore our playground, own it, and then expand it to meet new challenges. Each goal sets the stage for the next.',
        imageUrl: '/images/about-us/a_1.png',
      },
      {
        title: 'We work as a team',
        content:
          'We like to take it one step at a time. We explore our playground, own it, and then expand it to meet new challenges. Each goal sets the stage for the next.',
        imageUrl: '/images/about-us/a_2.png',
      },
      {
        title: 'We work as a team',
        content:
          'We like to take it one step at a time. We explore our playground, own it, and then expand it to meet new challenges. Each goal sets the stage for the next.',
        imageUrl: '/images/about-us/a_3.png',
      },
      {
        title: 'We work as a team',
        content:
          'We like to take it one step at a time. We explore our playground, own it, and then expand it to meet new challenges. Each goal sets the stage for the next.',
        imageUrl: '/images/about-us/a_4.png',
      },
    ],
  },
};

export default async function About() {
  const {
    categories,
    coreValues: { title, description, items = [] },
  } = dataAboutUs;

  return (
    <>
      <MainSection />
      <CategoriesSection categories={categories} />
      <CoreValuesSection title={title} description={description} items={items} />
    </>
  );
}
