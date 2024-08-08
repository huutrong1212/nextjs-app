export interface Metadata {
  title: string;
  description?: string;
}

export type MetadataConfig = {
  [key in PageKeys]: Metadata;
};

type PageKeys =
  | 'home'
  | 'about'
  | 'pricing'
  | 'contactSales'
  | 'blogs'
  | 'eBooksAndInsights'
  | 'customerStories'
  | 'webinarsAndVideos'
  | 'productGuides'
  | 'developerDocs'
  | 'faqs'
  | 'privacyPolicy'
  | 'solution';

export const metadataConfig: MetadataConfig = {
  home: {
    title: 'LMS - Home Page',
    description: 'Welcome to the Home Page',
  },
  about: {
    title: 'LMS - About Us',
    description: 'Learn more about us',
  },
  pricing: {
    title: 'LMS - Pricing',
    description: 'View our pricing plans',
  },
  contactSales: {
    title: 'LMS - Contact Sales',
    description: 'Contact our sales team for inquiries',
  },
  blogs: {
    title: 'LMS - Blogs',
    description: 'Read our latest blog posts',
  },
  eBooksAndInsights: {
    title: 'LMS - Ebooks and Insights',
    description: 'Explore our eBooks and insightful articles',
  },
  customerStories: {
    title: 'LMS - Customer Stories',
    description: 'Discover stories from our customers',
  },
  webinarsAndVideos: {
    title: 'LMS - Webinars and Videos',
    description: 'Watch our webinars and informative videos',
  },
  productGuides: {
    title: 'LMS - Product Guides',
    description: 'Explore our product guides and manuals',
  },
  developerDocs: {
    title: 'LMS - Developer Docs',
    description: 'Access our developer documentation and resources',
  },
  faqs: {
    title: 'LMS - FAQs',
    description: 'Access our developer documentation and resources',
  },
  privacyPolicy: {
    title: 'LMS - Privacy Policy',
    description: 'Read our privacy policy',
  },
  solution: {
    title: 'LMS - Solution',
    description: 'Learn more about our solution',
  },
};
