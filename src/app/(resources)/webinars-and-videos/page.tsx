import { CenterAlignedLayout } from '@/layouts';
import { DataTable } from '@/components';
import { ELocation } from '@/types/common';
import React from 'react';
import { Routes } from '@/types/routes';
import { getPostList } from '@/services/post';
import { metadataConfig } from '@/config/metadata';
import { notFound } from 'next/navigation';

export const metadata = metadataConfig.webinarsAndVideos;

interface WebinarsAndVideosProps {
  searchParams: { page: number };
}

const WebinarsAndVideos: React.FC<WebinarsAndVideosProps> = async ({ searchParams }) => {
  try {
    const dataWebinars = await getPostList({
      location: ELocation.EVENT_LOCATION_WEBINARS_VIDEOS,
      'pageable.page': searchParams?.page || 1,
      'pageable.size': 6,
    });

    return (
      <CenterAlignedLayout animationTitle="Webinars & videos">
        <DataTable
          data={dataWebinars?.news ?? []}
          totalPages={dataWebinars?.metadata?.total_pages}
          pathName={Routes.resources.webinarsVideos}
        />
      </CenterAlignedLayout>
    );
  } catch (error) {
    notFound();
  }
};

export default WebinarsAndVideos;
