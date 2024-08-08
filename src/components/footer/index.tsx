'use client';

import { Button, MotionDiv } from '@/components';
import { FacebookIcon, LinkInIcon, LogoIcon, YoutubeIcon } from '@/public/icons';
import { usePathname, useRouter } from 'next/navigation';

import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { Routes } from '@/types/routes';
import { useInView } from 'react-intersection-observer';

const EXTERNAL_LINKS = {
  facebook: 'https://www.facebook.com/banvienco',
  linkedin: 'https://www.linkedin.com/company/ban-vien-co/',
  youtube: 'https://www.youtube.com/@banvien-publicmedia7522',
};

const data = {
  solutions: [{ text: 'Solution', href: Routes.solutions }],
  resources: [
    { text: 'Blog', href: Routes.resources.blog },
    { text: 'eBooks & insights', href: Routes.resources.eBooksInsights },
    { text: 'Customer stories', href: Routes.resources.customerStories },
    { text: 'Webinars & videos', href: Routes.resources.webinarsVideos },
    { text: 'Product guides', href: Routes.resources.productGuides },
    { text: 'Developer docs', href: Routes.resources.developerDocs },
  ],
  explores: [
    { text: `What's new`, href: Routes.privacyPolicy },
    { text: 'Pricing', href: Routes.pricing },
    { text: 'About us', href: Routes.aboutUs },
    { text: 'Contact sales', href: Routes.contactSales },
    { text: 'Privacy Policy', href: Routes.privacyPolicy },
    { text: 'FAQs', href: Routes.faqs },
  ],
};

const Footer = () => {
  const pathname = usePathname();
  const router = useRouter();

  const [footerRef, footerInView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const { solutions, resources, explores } = data;
  const isDeveloperDocsPage = pathname.startsWith(Routes.resources.developerDocs);

  function handleGetStarted() {
    router.push(Routes.solutions);
  }

  return (
    <footer ref={footerRef}>
      {!isDeveloperDocsPage && (
        <MotionDiv isInView={footerInView} className="bg-primary p-14 relative">
          <Image
            src="/images/foot_left.png"
            alt="Left Background Image"
            className="absolute left-0 bottom-0 z-0 object-cover"
            width={500}
            height={500}
          />
          <Image
            src="/images/foot_right.png"
            alt="Right Background Image"
            className="absolute right-0 bottom-0 z-0 object-cover transform"
            width={500}
            height={500}
          />
          <div className="flex flex-col gap-6 items-center justify-center text-center">
            <div className="font-semibold text-3xl leading-10 text-white">
              Get started with Edtechtools today
            </div>
            <p className="text-base text-white text-center">
              Ready to make learning better and easier? We&apos;ve got the tools, you bring the{' '}
              <br className="block" /> vision.
            </p>
            <Button
              className="text-primary font-bold"
              typeButton="main"
              variant="tertiary"
              onClick={handleGetStarted}
            >
              Get started
            </Button>
          </div>
        </MotionDiv>
      )}

      <div className="bg-black">
        <div className="container lg:!max-w-[1440px] py-10 sm:py-14 lg:py-10 px-6 lg:px-[60px] flex flex-col text-white lg:flex-row lg:items-start lg:justify-between">
          <div className="flex flex-row flex-wrap lg:flex-col items-center justify-between gap-6 mb-6 lg:mb-0 lg:w-1/4 lg:items-start">
            <Link href="/" legacyBehavior>
              <a className="cursor-pointer">
                <LogoIcon fill="white" />
              </a>
            </Link>

            <div className="flex gap-3">
              <Link href={EXTERNAL_LINKS.facebook} target="_blank">
                <FacebookIcon />
              </Link>
              <Link href={EXTERNAL_LINKS.linkedin} target="_blank">
                <LinkInIcon />
              </Link>
              <Link href={EXTERNAL_LINKS.youtube} target="_blank">
                <YoutubeIcon />
              </Link>
            </div>
          </div>
          <div className="flex flex-col gap-6 md:flex-row lg:gap-[100px] lg:w-3/4">
            <div className="flex-1 flex flex-col gap-2 h-full">
              <span className="text-lg font-semibold">Solutions</span>
              {solutions.map((solution, index) => (
                <Link key={index} href={solution.href} legacyBehavior>
                  <a className="hover:text-primary text-sm block">{solution.text}</a>
                </Link>
              ))}
            </div>
            <div className="flex-1 flex flex-col gap-2 h-full">
              <span className="text-lg font-semibold">Resources</span>
              {resources.map((resource, index) => (
                <Link key={index} href={resource.href} legacyBehavior>
                  <a className="hover:text-primary text-sm block">{resource.text}</a>
                </Link>
              ))}
            </div>
            <div className="flex-1 flex flex-col gap-2 h-full">
              <span className="text-lg font-semibold">Explore</span>
              {explores.map((explore, index) => (
                <Link key={index} href={explore.href} legacyBehavior>
                  <a className="hover:text-primary text-sm block">{explore.text}</a>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="text-xs text-center bg-black border-t-2 border-grey-7 text-white p-4">
        © 2023 Edtechtools. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
