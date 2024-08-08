'use client';

import { Input, SelectPro, TSelectProOption } from '@/components';
import React, { useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { ICategory } from '@/types/category';
import { SearchIcon } from 'lucide-react';

interface BlogsActionProps {
  dataCategories: ICategory[];
  dataChildren: ICategory;
}

const BlogsAction: React.FC<BlogsActionProps> = ({ dataCategories, dataChildren }) => {
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(undefined);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const updateParams = (newParams: Record<string, string | undefined>) => {
    const params = new URLSearchParams(searchParams);
    Object.keys(newParams).forEach((key) => {
      if (newParams[key] === undefined || newParams[key] === '') {
        params.delete(key);
      } else {
        params.set(key, newParams[key] as string);
      }
    });
    replace(`${pathname}?${params.toString()}`);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateParams({ search: event.target.value });
  };

  const handleCategoryChange = (option: TSelectProOption) => {
    const categoryId = option?.value;
    setSelectedCategory(categoryId);
    updateParams({ parent_category_id: categoryId });
  };

  const handleTopicChange = (option: TSelectProOption) => {
    updateParams({ category_id: option?.value });
  };

  const categoryOptions = dataCategories.map((category) => ({
    value: category.id,
    label: category.name,
  }));

  const topicOptions = dataChildren?.children?.map((topic) => ({
    value: topic.id,
    label: topic.name,
  }));

  return (
    <>
      <div className="w-full max-w-[300px]">
        <SelectPro
          onChange={handleCategoryChange}
          options={categoryOptions}
          placeholder="All Categories"
          isClearable
          loading={!categoryOptions.length}
        />
      </div>
      <div className="w-full max-w-[300px]">
        <SelectPro
          onChange={handleTopicChange}
          options={topicOptions}
          placeholder="All Topics"
          isClearable
          disabled={!selectedCategory}
          loading={!topicOptions?.length}
        />
      </div>
      <div className="w-full max-w-[300px]">
        <Input
          icon={<SearchIcon className="w-5 h-5" />}
          placeholder="Search..."
          onChange={handleInputChange}
        />
      </div>
    </>
  );
};

export default BlogsAction;
