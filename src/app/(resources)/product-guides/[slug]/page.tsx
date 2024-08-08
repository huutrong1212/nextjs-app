import { getPostBySlug, getPostList } from '@/services/post';

import DownloadForm from '@/app/(resources)/product-guides/_components/download-form';
import { EState } from '@/types/common';
import { IPost } from '@/types/post';
import { MainLayout } from '@/layouts';
import { Metadata } from 'next';
import React from 'react';
import { Typography } from '@/components';
import { capitalizeFirstLetter } from '@/utils/helpers/common';

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const { slug } = params;
  const postDetail = await getPostBySlug(slug);
  const { title: pTitle = 'Default Title', description = 'Default Description' } =
    (postDetail?.news as IPost) || {};
  const title = `LMS - ${capitalizeFirstLetter(pTitle)}`;

  return { title, description };
}

export async function generateStaticParams() {
  const postData = await getPostList({ state: EState.STATE_PUBLIC });
  return postData?.news?.map((post: IPost) => ({
    slug: post.slug,
  }));
}

export default async function ProductGuidesDetails({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const postDetail = await getPostBySlug(slug);
  const { title, description = 'Fallback content', pdf = '' } = (postDetail?.news as IPost) || {};

  return (
    <MainLayout className="bg-teal-1 border-b">
      <div className="flex flex-col gap-8 md:flex-row ">
        <div className="w-full md:w-1/2 flex flex-col gap-8">
          <Typography variant="h1">{title ?? 'Title'}</Typography>
          <Typography
            variant="h4"
            className="font-normal"
            dangerouslySetInnerHTML={{ __html: description }}
          />
        </div>
        <div className="w-full md:w-1/2">
          <DownloadForm pdf={pdf} />
        </div>
      </div>
    </MainLayout>
  );
}
