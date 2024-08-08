import { CenterAlignedLayout } from '@/layouts';
import { DataTable } from '@/components/index';
import { ELocation } from '@/types/common';
import React from 'react';
import { Routes } from '@/types/routes';
import { getPostList } from '@/services/post';
import { metadataConfig } from '@/config/metadata';
import { notFound } from 'next/navigation';

export const metadata = metadataConfig.customerStories;
interface CustomerStoriesProps {
  searchParams: { page: number };
}

export default async function CustomerStories({ searchParams }: CustomerStoriesProps) {
  try {
    const dataCustomer = await getPostList({
      location: ELocation.EVENT_LOCATION_CUSTOMER_STORIES,
      'pageable.page': searchParams?.page || 1,
      'pageable.size': 6,
    });

    return (
      <CenterAlignedLayout animationTitle="Customer Stories">
        <DataTable
          data={dataCustomer?.news ?? []}
          totalPages={dataCustomer?.metadata?.total_pages}
          pathName={Routes.resources.customerStories}
        />
      </CenterAlignedLayout>
    );
  } catch (error) {
    notFound();
  }
}
