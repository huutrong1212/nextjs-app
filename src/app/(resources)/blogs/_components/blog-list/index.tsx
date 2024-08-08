import { getCategoryById, getCategoryList } from '@/services/category';

import { BlogsAction } from '@/app/(resources)/blogs/_components';
import { DataTable } from '@/components';
import React from 'react';
import { Routes } from '@/types/routes';
import { getPostList } from '@/services/post';
import { notFound } from 'next/navigation';
interface BlogProps {
  search: string;
  category_id: string;
  parent_category_id: string;
  page: number;
}

const BlogList = async ({ search, category_id, page, parent_category_id }: BlogProps) => {
  try {
    const dataBlogs = await getPostList({
      ...(search && { title: search as string }),
      ...(category_id && { category_id: category_id as string }),
      ...(parent_category_id && { parent_category_id: parent_category_id as string }),
      'pageable.page': page,
      'pageable.size': 9,
    });
    const dataCategories = await getCategoryList({
      exclude_children: true,
      include_default: false,
      for_developers: false,
    });

    const dataCategoriesById = await getCategoryById({
      id: parent_category_id,
      preload: ['children'],
    });
    const { categories } = dataCategories ?? {};
    const { category } = dataCategoriesById ?? {};

    return (
      <DataTable
        data={dataBlogs?.news ?? []}
        totalPages={dataBlogs?.metadata?.total_pages}
        pathName={Routes.resources.blog}
        actions={<BlogsAction dataCategories={categories ?? []} dataChildren={category} />}
      />
    );
  } catch (error) {
    notFound();
  }
};

export default BlogList;
