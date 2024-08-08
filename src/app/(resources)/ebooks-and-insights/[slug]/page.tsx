import { getPostBySlug, getPostList } from '@/services/post';

import { CenterAlignedLayout } from '@/layouts';
import { EState } from '@/types/common';
import { IPost } from '@/types/post';
import { Metadata } from 'next';
import React from 'react';
import { capitalizeFirstLetter } from '@/utils/helpers/common';
import dynamic from 'next/dynamic';

const EBookDetails = dynamic(
  () => import('@/app/(resources)/ebooks-and-insights/_components/ebook-details'),
  { ssr: false },
);

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

const EBookAndInsightsDetails = async ({ params }: { params: { slug: string } }) => {
  const { slug } = params;
  const postDetail = await getPostBySlug(slug);
  const { title } = (postDetail?.news as IPost) || {};

  return (
    <CenterAlignedLayout title={title ?? 'Title'} heading="h2">
      <EBookDetails post={postDetail?.news} />
    </CenterAlignedLayout>
  );
};

export default EBookAndInsightsDetails;
