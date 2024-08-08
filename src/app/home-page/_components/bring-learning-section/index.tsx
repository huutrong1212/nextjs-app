'use client';

import { Button, Card, EmptyData, MotionDiv } from '@/components';
import React, { useState } from 'react';

import { CenterAlignedLayout } from '@/layouts';
import { IPost } from '@/types/post';
import { Routes } from '@/types/routes';
import { useInView } from 'react-intersection-observer';
import { useRouter } from 'next/navigation';

interface BringLearningProps {
  data: IPost[];
}

const DATA_LIMIT = 3;
const BringLearning: React.FC<BringLearningProps> = ({ data }) => {
  const router = useRouter();
  const [showAll, setShowAll] = useState<boolean>(false);

  function handleSeeMore() {
    // setShowAll(!showAll);
    router.push(Routes.resources.eBooksInsights);
  }

  const [bringLearningRef, bringLearningInView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <CenterAlignedLayout
      title="Bring learning to life"
      description="Get insights on our process, product, and principles"
      heading="h2"
      ref={bringLearningRef}
    >
      {data.length > 0 ? (
        <MotionDiv isInView={bringLearningInView}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-items-center mt-10 lg:mt-16">
            {data.slice(0, showAll ? data.length : DATA_LIMIT).map((item, index) => (
              <Card key={index} data={item} href={`${Routes.resources.blog}/${item.slug}`} />
            ))}
          </div>
          <div className="flex justify-center mt-8">
            <Button onClick={handleSeeMore}>See More</Button>
          </div>
        </MotionDiv>
      ) : (
        <EmptyData />
      )}
    </CenterAlignedLayout>
  );
};

export default BringLearning;
