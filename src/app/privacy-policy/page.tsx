import { CenterAlignedLayout } from '@/layouts';
import React from 'react';
import { Typography } from '@/components';
import { metadataConfig } from '@/config/metadata';

export const metadata = metadataConfig.privacyPolicy;
const privacyPolicyContent = {
  lastUpdated: 'April 16, 2024',
  content: [
    {
      type: 'paragraph',
      text: 'A key historical tenet for large-scale educational testing was that tests had to be standardized so that they were the same for everyone. This arose from scientific principles that suggested that by making the test identical for all, differences in performance between test takers resulted from genuine individual differences (e.g. different knowledge and skill) rather than testing variance and error.',
    },
    {
      type: 'paragraph',
      text: 'Large-scale educational tests are critical to measuring the progress of learning and provide data on how schools and learning are progressing in different regions. Post-Covid concern around learning loss has added urgency to this. But advances in technology have made it possible to get the same (or better) kind of data from tests without the unpopular, enforced standardization that was previously required.',
    },
    {
      type: 'heading',
      level: 3,
      text: 'Our websites',
    },
    {
      type: 'paragraph',
      text: 'Information Collected. When you create an account on the Learnosity Support Site, register for or purchase services either on our main website or via a third-party payment merchant, you enter various information including name and contact details. Learnosity also collects information at this time, including the internet protocol (IP) address used to connect your computer to Internet; login; email address; password; computer and connection information such as browser type and version, operating system, platform and purchase data. Learnosity also records information about your interaction with Learnosity systems and personnel within our customer relationship management system, such as which resources you access or download.',
    },
    {
      type: 'paragraph',
      text: 'Technology can circumvent such risks by randomizing tests. Question or choice order can be shuffled; questions can be chosen at random from test banks; or it’s possible to create dynamic questions that change for every test taker.',
    },
    {
      type: 'heading',
      level: 3,
      text: 'Recruitment privacy policy',
    },
    {
      type: 'paragraph',
      text: 'If everyone gets the same questions, they can (and often do) leak—especially if tests are available at different times or on demand. Learners will share questions and answers with peers, criminals will harvest questions and sell them, and some teachers may stretch boundaries to help their learners better prepare for tests.',
    },
    {
      type: 'heading',
      level: 3,
      text: 'Information collected when you use our Software',
    },
    {
      type: 'paragraph',
      text: 'Learnosity provides a suite of educational software solutions designed to enhance assessment, learning and analytics capabilities for use by educational institutions, publishers and other providers of assessment technologies and solutions (“Learnosity Customers”), including where applicable in their provision of services to their end-user customers. The Learnosity customer or if applicable its end-user customer is the Data Controller and Learnosity is a Data Processor in respect of processing of personal information described in this section.',
    },
  ],
};

const PrivacyPolicy = () => {
  return (
    <CenterAlignedLayout
      timestamp={`Last Updated: ${privacyPolicyContent.lastUpdated}`}
      title="Privacy Policy"
      heading="h2"
    >
      <div className="px-0 lg:px-48">
        {privacyPolicyContent.content.map((section, index) => {
          if (section.type === 'paragraph') {
            return (
              <Typography
                key={index}
                dangerouslySetInnerHTML={{ __html: section.text }}
                className="mb-6"
              />
            );
          } else if (section.type === 'heading') {
            return (
              <Typography key={index} variant={`h${section.level}` as any} className="mb-6">
                {section.text}
              </Typography>
            );
          }
          return null;
        })}
      </div>
    </CenterAlignedLayout>
  );
};

export default PrivacyPolicy;
