import { Category } from '@/components/index';
import DefaultLayout from '@/layouts/default';
import React from 'react';

const categoriesData = [
  {
    imageSrc: '/images/structure.png',
    title: 'Keep designs consistent',
    description:
      "Access to shareable libraries means everyone's work is always aligned. With reusable styles and components, your whole team can design faster and more efficiently.",
    linkHref: '/learn-more',
  },
  {
    reverse: true,
    imageSrc: '/images/key.png',
    title: 'Build products faster',
    description:
      "Access to shareable libraries means everyone's work is always aligned. With reusable styles and components, your whole team can design faster and more efficiently.",
    linkHref: '/learn-more',
  },
];

const Categories = () => {
  return (
    <DefaultLayout className="flex flex-col gap-20">
      {categoriesData.map((content, index) => (
        <Category key={index} {...content} />
      ))}
    </DefaultLayout>
  );
};

export default Categories;
