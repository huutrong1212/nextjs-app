import React from 'react';
import { CenterAlignedLayout } from '@/layouts';
import { metadataConfig } from '@/config/metadata';
import { BlogList } from '@/app/(resources)/blogs/_components';

export const metadata = metadataConfig.blogs;
interface BlogProps {
  searchParams: { search: string; category_id: string; page: number; parent_category_id: string };
}

const Blogs = ({ searchParams }: BlogProps) => {
  const blogProps = {
    search: searchParams?.search || '',
    category_id: searchParams?.category_id || '',
    parent_category_id: searchParams?.parent_category_id || '',
    page: searchParams?.page || 1,
  };

  return (
    <CenterAlignedLayout animationTitle="Learning in progress">
      <BlogList {...blogProps} />
    </CenterAlignedLayout>
  );
};

export default Blogs;
