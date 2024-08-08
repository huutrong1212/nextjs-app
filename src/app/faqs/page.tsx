import { ContentData, FaqsDataStructure, IFaq } from '@/types/faqs';

import { DesktopFAQs } from '@/app/faqs/_components';
import { ICategory } from '@/types/category';
import React from 'react';
import { getCategoryList } from '@/services/category';
import { getFaqsList } from '@/services/faq.services';
import { metadataConfig } from '@/config/metadata';

export const metadata = metadataConfig.faqs;
const createCategoryMap = (categories: ICategory[], faqList: IFaq[]): ContentData => {
  const categoryMap: ContentData = {};

  const findCategoryName = (id: string, categories: ICategory[]): string | undefined => {
    for (const category of categories) {
      if (category.id === id) return category.name;
      const childCategoryName = findCategoryName(id, category.children);
      if (childCategoryName) return childCategoryName;
    }
    return undefined;
  };

  faqList.forEach((faq) => {
    const categoryName = findCategoryName(faq.category_id, categories);
    if (categoryName) {
      if (!categoryMap[categoryName]) {
        categoryMap[categoryName] = { title: categoryName, sections: [], tableOfContents: [] };
      }
      categoryMap[categoryName].sections.push({ title: faq.question, content: faq.answer });
      categoryMap[categoryName].tableOfContents.push(faq.question);
    }
  });

  return categoryMap;
};

const fetchAndMapData = async (): Promise<FaqsDataStructure> => {
  const [categoryData, faqData] = await Promise.all([
    getCategoryList({ exclude_parent: true }),
    getFaqsList({}),
  ]);

  const categoriesList = categoryData?.categories || [];
  const faqList = faqData.faqs || [];

  const categories = [
    {
      subcategories: categoriesList.map((category) => category.name),
    },
  ];

  const content = createCategoryMap(categoriesList, faqList);
  return { categories, content };
};

const FAQs = async () => {
  const faqData = await fetchAndMapData();

  return (
    <div className="md:container md:py-14">
      <DesktopFAQs faqData={faqData} />
    </div>
  );
};

export default FAQs;
