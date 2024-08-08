'use client';

import React, { useEffect, useState } from 'react';

import { DevDataStructure } from '@/types/dev';
import { MobileDeveloper } from '@/app/(resources)/developer-docs/_components';
import { Typography } from '@/components';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';

interface DesktopDeveloperProps {
  devData: DevDataStructure;
}

const DesktopDeveloper: React.FC<DesktopDeveloperProps> = ({ devData }) => {
  const router = useRouter();
  const [activeSubcategory, setActiveSubcategory] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  const filteredCategories = devData.categories.reduce<DevDataStructure['categories']>(
    (acc, category) => {
      if (category.subcategories.length > 0) {
        acc.push(category);
      }
      return acc;
    },
    [],
  );

  useEffect(() => {
    if (!activeSubcategory) {
      const query = new URLSearchParams(window.location.search);
      const subcategory = query.get('id');
      if (subcategory) {
        setActiveSubcategory(subcategory);
      } else if (filteredCategories.length > 0) {
        const firstSubcategory = filteredCategories[0].subcategories[0].subId;
        setActiveSubcategory(firstSubcategory);
      }
    }
  }, [filteredCategories, activeSubcategory]);

  useEffect(() => {
    if (activeSubcategory) {
      const query = new URLSearchParams(window.location.search);
      query.set('id', activeSubcategory);
      router.push(`?${query.toString()}`, { scroll: false });
    }
  }, [activeSubcategory, router]);

  const handleClick = (subcategory: string) => {
    setActiveSubcategory(subcategory);
  };

  const handleTOCClick = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
    }
  };

  const getSubcategoryData = (subId: string) => {
    for (const category of filteredCategories) {
      const subcategory = category.subcategories.find((sub) => sub.subId === subId);
      if (subcategory) {
        return {
          title: subcategory.subTitle,
          sections: devData.content[subcategory.subTitle]?.sections || [],
          tableOfContents: devData.content[subcategory.subTitle]?.tableOfContents || [],
        };
      }
    }
    return { title: '', sections: [], tableOfContents: [] };
  };

  const { title, sections, tableOfContents } = activeSubcategory
    ? getSubcategoryData(activeSubcategory)
    : { title: '', sections: [], tableOfContents: [] };

  return (
    <div className="flex flex-col md:flex-row gap-14">
      <div className="w-1/3 border-r-[1px] border-grey-5 hidden md:flex">
        <div className="flex flex-col gap-6 w-full">
          {filteredCategories.map((category) => (
            <ul className="w-full" key={category.title}>
              <li>
                <Typography variant="h4">{category.title}</Typography>
                <ul>
                  {category.subcategories.map((subcategory) => (
                    <li key={subcategory.subId}>
                      <button
                        onClick={() => handleClick(subcategory.subId)}
                        className={cn(
                          'flex items-center h-10 w-full text-left hover:bg-grey-3',
                          activeSubcategory === subcategory.subId
                            ? 'bg-teal-1 text-primary font-semibold'
                            : 'hover:bg-grey-4',
                        )}
                      >
                        {subcategory.subTitle}
                      </button>
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
          ))}
        </div>
      </div>

      <MobileDeveloper
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        devData={filteredCategories}
        selectedCategory={activeSubcategory}
        handleCategoryClick={(subcategory: string) => handleClick(subcategory)}
      />

      {activeSubcategory && (
        <div className="w-full lg:w-2/3 pb-20 container">
          <div className="flex flex-col gap-4 mb-4">
            <Typography variant="h2">{title}</Typography>
            <Typography variant="h4">Table of Contents</Typography>
            <ul>
              {tableOfContents.map((item, index) => (
                <li
                  key={index}
                  className="text-blue-6 hover:underline cursor-pointer"
                  onClick={() => handleTOCClick(item.replace(/\s+/g, '-').toLowerCase())}
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {sections.map((section, index) => (
            <div key={index} id={section.title.replace(/\s+/g, '-').toLowerCase()} className="mb-4">
              <Typography variant="h5" className="mb-2">
                {section.title}
              </Typography>
              <Typography dangerouslySetInnerHTML={{ __html: section.content }} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DesktopDeveloper;
