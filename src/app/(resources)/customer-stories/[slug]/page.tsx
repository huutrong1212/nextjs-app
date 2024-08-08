import React, { Fragment } from 'react';
import { CenterAlignedLayout } from '@/layouts';
import { IPost } from '@/types/post';
import { capitalizeFirstLetter } from '@/utils/helpers/common';
import { Metadata } from 'next';
import { getPostBySlug, getPostList } from '@/services/post';
import { EState } from '@/types/common';
import { DangerouslyHTML } from '@/components';

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

export default async function CustomerStoriesDetails({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const postDetail = await getPostBySlug(slug);
  const { title, content } = (postDetail?.news as IPost) || {};

  return (
    <Fragment>
      <CenterAlignedLayout timestamp="April 16, 2024" title={title ?? ''} heading="h2">
        <div className="px-0 lg:px-48">
          <DangerouslyHTML content={content ?? 'Fallback content'} />
        </div>
      </CenterAlignedLayout>
    </Fragment>
  );
}
