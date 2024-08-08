import React, { Fragment } from 'react';
import { CenterAlignedLayout } from '@/layouts';
import { RelatedArticles } from '@/app/(resources)/blogs/_components';
import { IPost } from '@/types/post';
import { capitalizeFirstLetter, convertTimestampToDate } from '@/utils/helpers/common';
import { Metadata } from 'next';
import { EState } from '@/types/common';
import { getFeatureNewsList, getPostBySlug, getPostList } from '@/services/post';
import { Routes } from '@/types/routes';

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

const BlogDetails = async ({ params }: { params: { slug: string } }) => {
  const { slug } = params;

  const [postDetail, featureNewsData] = await Promise.all([
    getPostBySlug(slug),
    getFeatureNewsList({ limit: 3 }),
  ]);
  const { title, content = '', created_date } = (postDetail?.news as IPost) || {};

  return (
    <Fragment>
      <CenterAlignedLayout
        timestamp={convertTimestampToDate(+created_date) ?? ''}
        title={title ?? 'Title'}
        heading="h2"
      >
        <div className="w-2/3	mx-auto" dangerouslySetInnerHTML={{ __html: content }} />
      </CenterAlignedLayout>
      <RelatedArticles data={featureNewsData?.news ?? []} pathName={Routes.resources.blog} />
    </Fragment>
  );
};

export default BlogDetails;
