import React from 'react';
import { DataTable } from '@/components';
import { Routes } from '@/types/routes';
import { CenterAlignedLayout } from '@/layouts';
import { metadataConfig } from '@/config/metadata';
import { ELocation } from '@/types/common';
import { notFound } from 'next/navigation';
import { getPostList } from '@/services/post';

export const metadata = metadataConfig.eBooksAndInsights;

interface EBooksAndInsightsProps {
  searchParams: { page: number };
}

const EBooksAndInsights: React.FC<EBooksAndInsightsProps> = async ({ searchParams }) => {
  try {
    const dataEAndIns = await getPostList({
      location: ELocation.EVENT_LOCATION_EBOOKS_INSIGHTS,
      'pageable.page': searchParams?.page || 1,
      'pageable.size': 6,
    });

    return (
      <CenterAlignedLayout animationTitle="eBooks & Insights">
        <DataTable
          data={dataEAndIns?.news ?? []}
          totalPages={dataEAndIns?.metadata?.total_pages}
          pathName={Routes.resources.eBooksInsights}
        />
      </CenterAlignedLayout>
    );
  } catch (error) {
    notFound();
  }
};

export default EBooksAndInsights;
