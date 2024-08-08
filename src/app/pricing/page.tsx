import React from 'react';
import {
  AccordionContentSystem,
  AccordionItemSystem,
  AccordionSystem,
  AccordionTriggerSystem,
  EmptyData,
  PricingCard,
} from '@/components';
import FeatureTable from '@/components/ui/table/table-custom';
import { metadataConfig } from '@/config/metadata';
import { CenterAlignedLayout, LeftAlignedLayout } from '@/layouts';
import { getFaqsList } from '@/services/faq.services';
import { EFAQLocation, IFaq } from '@/types/faqs';

export const metadata = metadataConfig.pricing;
const dataTables = [
  {
    features: [
      {
        name: '',
        options: [
          { name: 'Professional', price: 120 },
          { name: 'Organization', price: 245 },
          { name: 'Enterprise', price: 320 },
        ],
      },
    ],
  },
  {
    title: 'Products',
    features: [
      { name: 'Author', options: [true, true, true] },
      { name: 'Questions', options: [true, true, true] },
      { name: 'Math', options: [true, true, true] },
      { name: 'Assessments', options: [true, true, true] },
      { name: 'Analytics', options: [false, true, true] },
      { name: 'Support', options: [false, true, true] },
    ],
  },
  {
    title: 'Platform',
    features: [
      { name: 'Single Tenancy', options: [false, true, true] },
      { name: 'Multi-region', options: [false, false, true] },
      { name: 'Live view', options: [false, 'Upload your own videos', 'Upload your own videos'] },
    ],
  },
];

const dataPricing = {
  title: 'Simple, transparent pricing',
  description:
    'We have a subscription level to fit your needs, from a free teacher account to large-scale district assessments and data dashboards.',
  plans: [
    {
      name: 'Professional',
      price: '$120',
      features: [
        'All analytics features',
        'Up to 250,000 tracked visits',
        'Normal support',
        'Up to 3 team members',
      ],
    },
    {
      name: 'Organization',
      price: '$245',
      features: [
        'All analytics features',
        'Up to 250,000 tracked visits',
        'Normal support',
        'Up to 3 team members',
        'Text',
        'Text',
        'Text',
      ],
    },
    {
      name: 'Enterprise',
      price: '$320',
      features: [
        'All analytics features',
        'Up to 250,000 tracked visits',
        'Normal support',
        'Up to 3 team members',
        'Text',
        'Text',
        'Text',
      ],
    },
  ],
};

const Pricing = async () => {
  const faqsData = await getFaqsList({
    location: EFAQLocation.FAQ_TYPE_PRICING,
    for_developers: false,
  });

  const { faqs = [] } = faqsData || {};
  const { title, description, plans = [] } = dataPricing;

  return (
    <>
      <CenterAlignedLayout title={title} description={description}>
        <div className="flex flex-col gap-3 mt-16 md:mt-20 lg:mt-[120px]">
          <span className="text-end">Prices in $ USD</span>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {plans?.map((plan: any, index: number) => (
              <div key={index}>
                <PricingCard plan={plan} />
              </div>
            ))}
          </div>
        </div>
      </CenterAlignedLayout>
      <LeftAlignedLayout title="Compare features">
        <FeatureTable data={dataTables} />
      </LeftAlignedLayout>
      <CenterAlignedLayout title="Pricing FAQs" heading="h2">
        {faqs.length > 0 ? (
          <AccordionSystem type="multiple" className="w-full max-w-[800px] mx-auto">
            {faqs.map((item: IFaq) => (
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

export default Pricing;
