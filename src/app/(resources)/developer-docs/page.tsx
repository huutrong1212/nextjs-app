import { IFaq } from '@/types/faqs';
import { ContentData, DevCategory, DevDataStructure } from '@/types/dev';
import { DesktopDeveloper } from '@/app/(resources)/developer-docs/_components';
import { ICategory } from '@/types/category';
import React from 'react';
import { getCategoryList } from '@/services/category';
import { getFaqsList } from '@/services/faq.services';
import { metadataConfig } from '@/config/metadata';

export const metadata = metadataConfig.developerDocs;
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

const mapCategories = (categories: ICategory[]): DevCategory[] => {
  return categories.map((category) => ({
    title: category.name,
    subcategories: category.children.map((child) => ({
      subId: child.id,
      subTitle: child.name,
    })),
  }));
};

const fetchAndMapData = async (categoryId: string): Promise<DevDataStructure> => {
  try {
    const [categoryData, faqData] = await Promise.all([
      getCategoryList({
        for_developers: true,
        exclude_children: true,
        preload: ['children'],
      }),
      getFaqsList({
        for_developers: true,
        category_id: categoryId,
      }),
    ]);

    const categoriesList = categoryData?.categories || [];
    const faqList = faqData.faqs || [];

    const categories = mapCategories(categoriesList);
    const content = createCategoryMap(categoriesList, faqList);

    return {
      categories,
      content,
    };
  } catch (error) {
    return { categories: [], content: {} };
  }
};

const DeveloperDocs: React.FC<{ searchParams: { id: string } }> = async ({ searchParams }) => {
  const categoryId = searchParams?.id || '';
  const developerDocsData = await fetchAndMapData(categoryId);

  return (
    <div className="md:container md:py-14">
      <DesktopDeveloper devData={developerDocsData} />
    </div>
  );
};

export default DeveloperDocs;
