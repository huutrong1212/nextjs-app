import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button, CheckedItem, Typography } from '@/components';
import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';
export interface CategoryProps {
  item: {
    imageSrc: string;
    imageClassName?: string;
    subtitle?: string;
    title: string;
    description: string;
    linkHref?: string;
    reverse?: boolean;
    textFirst?: boolean;
    checkedList?: string[];
    isHeader?: boolean;
  };
}

const Category: React.FC<CategoryProps> = ({ item }) => {
  const {
    imageSrc,
    imageClassName,
    subtitle,
    title,
    description,
    linkHref,
    checkedList,
    reverse = false,
    textFirst = false,
    isHeader = false,
  } = item;

  return (
    <div
      className={cn(
        'flex flex-col md:flex-row justify-between items-center gap-8 sm:gap-16 lg:gap-20',
        reverse ? 'md:flex-row-reverse' : '',
        textFirst ? 'flex-col-reverse' : '',
      )}
    >
      {imageSrc && (
        <div className={cn('flex-1 flex justify-center', imageClassName)}>
          <Image
            src={imageSrc}
            alt={title}
            width={560}
            height={560}
            className="w-full object-cover pointer-events-none"
          />
        </div>
      )}
      {isHeader ? (
        <div className="lg:w-2/3 space-y-8 lg:space-y-10">
          <Typography
            variant="h2"
            className="sm:text-[32px] lg:text-[42px] sm:leading-[42px] lg:leading-[65px] transition-colors duration-300 ease-in-out hover:text-primary cursor-pointer"
            dangerouslySetInnerHTML={{ __html: title }}
          />
          <Typography
            variant="h5"
            className="font-normal sm:text-[20px] sm:leading-[28px]"
            dangerouslySetInnerHTML={{ __html: description }}
          />
        </div>
      ) : (
        <div className="flex-1 flex flex-col gap-6">
          <div>
            {subtitle && (
              <Typography className="text-grey-8 font-normal" variant="h4">
                {subtitle}
              </Typography>
            )}
            <Typography
              variant="h2"
              dangerouslySetInnerHTML={{ __html: title }}
              className="transition-colors duration-300 ease-in-out hover:text-primary cursor-pointer"
            />
          </div>
          <Typography
            variant="h5"
            className="font-normal"
            dangerouslySetInnerHTML={{ __html: description }}
          />
          {checkedList && (
            <div className="flex flex-col gap-4">
              {checkedList.map((checked, index) => (
                <CheckedItem key={index} content={checked} />
              ))}
            </div>
          )}

          {checkedList ? (
            <div>
              <Button>Learn more</Button>
            </div>
          ) : (
            linkHref && (
              <Link href={linkHref} legacyBehavior>
                <a className="text-grey-12 w-fit relative">
                  <span className="group flex items-center gap-2">
                    <span className="group-hover:underline">Learn more</span>
                    <ArrowRight className="w-5 h-5 transition-all duration-300 transform translate-x-0 group-hover:translate-x-2" />
                  </span>
                </a>
              </Link>
            )
          )}
        </div>
      )}
    </div>
  );
};

export default Category;
