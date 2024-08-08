import {
  BringLearning,
  Categories,
  MainSection,
  Testimonial,
  TrustedSection,
} from '@/app/home-page/_components';

import { getFeatureNewsList } from '@/services/post';

const data = {
  categories: [
    {
      imageSrc: '/images/structure.png',
      title: 'Express the power of your ideas with Edtechtools',
      description:
        'Let&apos; make your work more organize and easily using the Taskio Dashboard with many of the latest featuresin managing work every day.',
      linkHref: '/learn-more',
    },
    {
      reverse: true,
      imageSrc: '/images/key.png',
      title: 'Build products faster',
      description:
        'With unlocked features like unlimited files, version history, and access to audio chat, moving work forward has never been easier.',
      linkHref: '/learn-more',
      checkedList: [
        'Free Consulting With Experet Saving Money',
        'Online Banking',
        'Investment Report Every Month',
        'Saving Money For The Future',
        'Online Transection',
      ],
    },
  ],
};

const HomePage = async () => {
  const insightsData = await getFeatureNewsList({
    limit: 3,
  });

  return (
    <>
      <MainSection />
      <TrustedSection />
      <Categories data={data?.categories} />
      <Testimonial />
      <BringLearning data={insightsData?.news ?? []} />
    </>
  );
};

export default HomePage;
