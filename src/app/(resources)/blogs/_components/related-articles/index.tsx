import React from 'react';
import { Card } from '@/components';
import { LeftAlignedLayout } from '@/layouts';
import { IPost } from '@/types/post';
interface RelatedArticlesProps {
  data: IPost[];
  pathName?: string;
}

const RelatedArticles: React.FC<RelatedArticlesProps> = ({ data, pathName }) => {
  return (
    <LeftAlignedLayout title="Related articles" className="pb-20">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {data.map((item, index) => (
          <Card key={index} data={item} href={`${pathName}/${item.slug}`} />
        ))}
      </div>
    </LeftAlignedLayout>
  );
};

export default RelatedArticles;
