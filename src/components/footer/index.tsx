import React from 'react';
import { Button } from '@/components/ui/button';
import { FacebookIcon, LinkInIcon, LogoIcon, YoutubeIcon } from 'public/icons/index';
import { cn } from '@/lib/utils';

const data = {
  solutions: [
    { text: 'Solution', href: '#' },
    { text: 'Solution 1', href: '#' },
    { text: 'Solution 2', href: '#' },
    { text: 'Solution 3', href: '#' },
  ],
  resources: [
    { text: 'Resources', href: '#' },
    { text: 'Blog', href: '#' },
    { text: 'eBooks & insights', href: '#' },
    { text: 'Customer stories', href: '#' },
    { text: 'Webinars & videos', href: '#' },
    { text: 'Product guides', href: '#' },
    { text: 'Developer docs', href: '#' },
  ],
  explores: [
    { text: 'Explore', href: '#' },
    { text: `What's new`, href: '#' },
    { text: 'Pricing', href: '#' },
    { text: 'About us', href: '#' },
    { text: 'Contact sales', href: '#' },
    { text: 'Privacy Policy', href: '#' },
    { text: 'FAQs', href: '#' },
  ],
};

const Footer = () => {
  const { solutions, resources, explores } = data;

  return (
    <footer>
      <div className="bg-primary p-14 relative">
        <img
          src="/images/foot_left.png"
          alt="Left Background Image"
          className="absolute left-0 bottom-0 z-0 h-[127px] min-w-[389px] object-cover"
        />
        <img
          src="/images/foot_right.png"
          alt="Right Background Image"
          className="absolute right-0 bottom-0 z-0 h-[127px] min-w-[389px] object-cover transform"
        />
        <div className="flex flex-col gap-6 items-center justify-center">
          <div className="font-semibold text-3xl leading-10 text-white">
            Get started with Edtechtools today
          </div>
          <p className="text-base text-white text-center">
            Ready to make learning better and easier? We've got the tools, you bring the{' '}
            <br className="block" /> vision.
          </p>
          <Button variant="outline" className="text-primary font-bold">
            Get started
          </Button>
        </div>
      </div>

      <div className="bg-black p-10">
        <div className="flex flex-col md:flex-row items-start text-white gap-[100px]">
          <div className="mb-4 md:mb-0 flex-1 flex flex-col items-start gap-6">
            <LogoIcon fill="white" />
            <div className="flex gap-3">
              <FacebookIcon />
              <LinkInIcon />
              <YoutubeIcon />
            </div>
          </div>
          <div className="flex-1 flex flex-col gap-2">
            {solutions.map((solution, index) => (
              <a
                key={index}
                href={solution.href}
                className={cn('hover:text-gray-400 block md:inline text-sm', {
                  'text-lg': index === 0,
                })}
              >
                {solution.text}
              </a>
            ))}
          </div>
          <div className="flex-1 flex flex-col gap-2">
            {resources.map((resource, index) => (
              <a
                key={index}
                href={resource.href}
                className={cn('hover:text-gray-400 block md:inline text-sm', {
                  'text-lg': index === 0,
                })}
              >
                {resource.text}
              </a>
            ))}
          </div>
          <div className="flex-1 flex flex-col gap-2">
            {explores.map((explore, index) => (
              <a
                key={index}
                href={explore.href}
                className={cn('hover:text-gray-400 block md:inline text-sm', {
                  'text-lg': index === 0,
                })}
              >
                {explore.text}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="text-xs text-center bg-black border-t text-white p-4">
        © 2023 Edtechtools. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
