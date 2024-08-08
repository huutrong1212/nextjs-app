import { CenterAlignedLayout } from '@/layouts';
import { DataTable } from '@/components';
import { ELocation } from '@/types/common';
import React from 'react';
import { Routes } from '@/types/routes';
import { getPostList } from '@/services/post';
import { metadataConfig } from '@/config/metadata';
import { notFound } from 'next/navigation';

export const metadata = metadataConfig.productGuides;
interface ProductGuidesProps {
  searchParams: { page: number };
}

const ProductGuides: React.FC<ProductGuidesProps> = async ({ searchParams }) => {
  try {
    const dataProductGuides = await getPostList({
      location: ELocation.EVENT_LOCATION_PRODUCT_GUIDES,
      'pageable.page': searchParams?.page || 1,
      'pageable.size': 6,
    });

    return (
      <CenterAlignedLayout animationTitle="Product Guides">
        <DataTable
          data={dataProductGuides?.news ?? []}
          totalPages={dataProductGuides?.metadata?.total_pages}
          pathName={Routes.resources.productGuides}
        />
      </CenterAlignedLayout>
    );
  } catch (error) {
    notFound();
  }
};

export default ProductGuides;
