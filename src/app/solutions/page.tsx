import {
  AccordionContentSystem,
  AccordionItemSystem,
  AccordionSystem,
  AccordionTriggerSystem,
  EmptyData,
} from '@/components';
import { Categories, Testimonial, TrustedSection } from '@/app/home-page/_components';

import { CenterAlignedLayout } from '@/layouts';
import { EFAQLocation } from '@/types/faqs';
import MainSection from './_components/main-section';
import { getFaqsList } from '@/services/faq.services';
import { metadataConfig } from '@/config/metadata';

const dataContent = [
  {
    className: 'bg-teal-1 lg:py-[120px]',
    items: [
      {
        isHeader: true,
        title: 'Bring designs to life-before development',
        description: `Let's make your work more organize and easily using the Taskio Dashboard with many of the latest featuresin managing work every day.`,
      },
      {
        reverse: true,
        textFirst: true,
        imageSrc: '/images/solution.png',
        imageClassName: 'flex-1 sm:flex-[0_0_39%] lg:flex-[0_0_60%]',
        title: "We're inspiring",
        description: `We gather talent and inspiration from creatives all around the world –all in one place– and looove it when we help you make your great ideas happen.<br /><br />
    We believe in the power of good design and community. Our spirit is restless, and our inner joyful rebel says: Don't follow all the conventions; rewrite them.`,
      },
      {
        textFirst: true,
        imageSrc: '/images/solution_2.png',
        imageClassName: 'flex-1 sm:flex-[0_0_39%] lg:flex-[0_0_60%]',
        title: 'We help anyone create great designs, faster',
        description:
          'With unlocked features like unlimited files, version history, and access to audio chat, moving work forward has never been easier.',
      },
    ],
  },
  {
    className: 'lg:py-[120px]',
    items: [
      {
        isHeader: true,
        title: 'Explore features built for faster, richer prototyping',
        description: `Let's make your work more organize and easily using the Taskio Dashboard with many of the latest featuresin managing work every day.`,
      },
      {
        reverse: true,
        textFirst: true,
        imageSrc: '/images/solution.png',
        imageClassName: 'flex-1 sm:flex-[0_0_39%] lg:flex-[0_0_60%]',
        title: "We're inspiring",
        description: `We gather talent and inspiration from creatives all around the world –all in one place– and looove it when we help you make your great ideas happen.<br /><br />
    We believe in the power of good design and community. Our spirit is restless, and our inner joyful rebel says: Don't follow all the conventions; rewrite them.`,
      },
      {
        textFirst: true,
        imageSrc: '/images/solution_2.png',
        imageClassName: 'flex-1 sm:flex-[0_0_39%] lg:flex-[0_0_60%]',
        title: 'We help anyone create great designs, faster',
        description:
          'With unlocked features like unlimited files, version history, and access to audio chat, moving work forward has never been easier.',
      },
    ],
  },
];

export const metadata = metadataConfig.solution;
const Solutions = async () => {
  const faqsData = await getFaqsList({
    location: EFAQLocation.FAQ_TYPE_SOLUTION,
    for_developers: false,
  });

  const { faqs = [] } = faqsData || {};

  return (
    <>
      <MainSection />
      <TrustedSection className="border-none" />
      {dataContent.map((content, index) => (
        <Categories key={index} className={content.className} data={content.items} />
      ))}
      <Testimonial />
      <CenterAlignedLayout title="FAQs" heading="h2" className="py-16 sm:py-20 lg:py-[120px]">
        {faqs.length > 0 ? (
          <AccordionSystem type="multiple" className="w-full max-w-[800px] mx-auto">
            {faqs.map((item) => (
              <AccordionItemSystem key={item.id} value={item.id}>
                <AccordionTriggerSystem className="text-left">
                  {item.question}
                </AccordionTriggerSystem>
                <AccordionContentSystem>
                  <p
                    className="p-4"
                    dangerouslySetInnerHTML={{
                      __html: item.answer,
                    }}
                  />
                </AccordionContentSystem>
              </AccordionItemSystem>
            ))}
          </AccordionSystem>
        ) : (
          <EmptyData />
        )}
      </CenterAlignedLayout>
    </>
  );
};

export default Solutions;
