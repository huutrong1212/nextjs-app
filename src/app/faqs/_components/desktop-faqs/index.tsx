'use client';

import { FaqsCategory, FaqsDataStructure, Section } from '@/types/faqs';
import React, { useEffect, useRef, useState } from 'react';

import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import MobileFAQs from '../mobile-faqs';
import { Button, Typography } from '@/components';
import { cn } from '@/lib/utils';

interface DesktopFAQsProps {
  faqData: FaqsDataStructure;
}

const MAX_ITEMS = 3;
const DesktopFAQs: React.FC<DesktopFAQsProps> = ({ faqData }) => {
  const [expandedCategories, setExpandedCategories] = useState<{ [key: string]: boolean }>({});
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const contentRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  useEffect(() => {
    if (selectedCategory && contentRefs.current[selectedCategory]) {
      contentRefs.current[selectedCategory]!.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest',
      });
    }
  }, [selectedCategory]);

  const toggleExpanded = (category: string) => {
    setExpandedCategories((prevState) => ({
      ...prevState,
      [category]: !prevState[category],
    }));
  };

  const handleSelectedCategory = (subcategory: string) => {
    setSelectedCategory(subcategory === selectedCategory ? null : subcategory);
  };

  const getSubcategoryTableOfContents = (subcategory: string): string[] => {
    const [categoryIndex, subIndex] = subcategory.split('-');
    const category = faqData?.categories?.[parseInt(categoryIndex, 10)];
    return (
      faqData?.content?.[category?.subcategories?.[parseInt(subIndex, 10)]]?.tableOfContents || []
    );
  };

  const getCategoryAndSubcategoryTitles = (subcategory: string) => {
    const [categoryIndex, subIndex, subcategoryTitle] = subcategory.split('-');
    const category = faqData?.categories?.[parseInt(categoryIndex, 10)];
    const categoryTitle = category?.title || '';
    const subcategoryActualTitle =
      category?.subcategories?.[parseInt(subIndex, 10)] || subcategoryTitle;
    return `${categoryTitle} ${subcategoryActualTitle}`;
  };

  const renderSubcategoryContent = (
    sections: Section[],
    showContent: boolean,
    category: string,
  ) => {
    const isExpanded = expandedCategories[category];
    const itemsToShow = isExpanded || showContent ? sections : sections.slice(0, MAX_ITEMS);

    return (
      <div className="w-full">
        {itemsToShow.map((section, index) => (
          <div
            key={index}
            className="mb-2 lg:mb-6"
            ref={(el) => {
              if (el) {
                contentRefs.current[`${category}-${index}`] = el;
              }
            }}
          >
            {showContent ? (
              <>
                <Typography variant="h4" className="mb-2">
                  {section.title}
                </Typography>
                <Typography dangerouslySetInnerHTML={{ __html: section.content }} />
              </>
            ) : (
              <Link href={`#${section.title}`} legacyBehavior>
                <a
                  onClick={() => handleSelectedCategory(category)}
                  className="mb-2 text-blue-6 hover:underline cursor-pointer"
                >
                  {section.title}
                </a>
              </Link>
            )}
          </div>
        ))}
        {!showContent && sections.length > MAX_ITEMS && (
          <button
            onClick={() => toggleExpanded(category)}
            className="text-blue-6 hover:underline cursor-pointer focus:outline-none mt-2"
          >
            {isExpanded ? (
              'Show less questions'
            ) : (
              <span className="flex gap-2 items-center">
                See all questions ({sections.length}) <ArrowRight className="w-5 h-5" />
              </span>
            )}
          </button>
        )}
      </div>
    );
  };

  return (
    <div className="flex flex-col md:flex-row gap-14">
      <div className="w-1/4 border-r-[1px] border-grey-5 hidden md:flex">
        <div className="flex flex-col gap-6 w-full">
          {faqData?.categories?.map((category: FaqsCategory, index: number) => (
            <ul key={index}>
              {category.subcategories?.map((subcategory, subIndex) => (
                <li key={`${index}-${subIndex}`}>
                  <button
                    onClick={() => handleSelectedCategory(`${index}-${subIndex}-${subcategory}`)}
                    className={cn(
                      'flex items-center h-10 w-full text-left hover:bg-grey-3',
                      selectedCategory === `${index}-${subIndex}-${subcategory}`
                        ? 'bg-teal-1 text-primary font-semibold'
                        : 'hover:bg-grey-4',
                    )}
                  >
                    {subcategory}
                  </button>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>

      <MobileFAQs
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        faqData={faqData.categories || []}
        selectedCategory={selectedCategory}
        handleCategoryClick={(subcategory: string) => handleSelectedCategory(subcategory)}
      />

      <div className="w-full lg:w-3/4 px-6 pb-5">
        <Typography variant="h2" className="mb-4">
          {selectedCategory
            ? `FAQs / ${getCategoryAndSubcategoryTitles(selectedCategory)}`
            : 'FAQs'}
        </Typography>

        {selectedCategory ? (
          <div className="flex flex-col gap-[10px] mb-4">
            <Typography variant="h3">Table of content</Typography>
            <ul>
              {getSubcategoryTableOfContents(selectedCategory).map((title, index) => (
                <li key={index} className="text-blue-6 hover:underline cursor-pointer">
                  {title}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {faqData?.categories?.flatMap((category: FaqsCategory, index: number) =>
              category.subcategories?.map((subcategory, subIndex) => (
                <div key={`${index}-${subIndex}`} className="space-y-4">
                  <Typography variant="h4">{subcategory}</Typography>
                  {renderSubcategoryContent(
                    faqData?.content?.[subcategory]?.sections || [],
                    false,
                    `${index}-${subIndex}-${subcategory}`,
                  )}
                </div>
              )),
            )}
          </div>
        )}

        {faqData?.categories?.map((category: FaqsCategory, index: number) =>
          category.subcategories?.map((subcategory, subIndex) => {
            const subcategoryId = `${index}-${subIndex}-${subcategory}`;
            return (
              selectedCategory === subcategoryId &&
              renderSubcategoryContent(
                faqData?.content?.[subcategory]?.sections || [],
                true,
                subcategoryId,
              )
            );
          }),
        )}
      </div>
    </div>
  );
};

export default DesktopFAQs;
