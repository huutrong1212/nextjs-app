'use client';

import React, { forwardRef } from 'react';
import { AnimatedText, Typography } from '@/components';
import { cn } from '@/lib/utils';

interface CenterAlignedLayoutProps extends React.HTMLAttributes<HTMLElement> {
  timestamp?: string;
  title?: string;
  animationTitle?: string;
  subtitle?: string;
  description?: string;
  children?: React.ReactNode;
  heading?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p';
  className?: string;
}

const CenterAlignedLayout = forwardRef<HTMLDivElement, CenterAlignedLayoutProps>(
  (
    {
      timestamp,
      title,
      animationTitle,
      subtitle,
      description,
      children,
      heading = 'h1',
      className,
      ...rest
    },
    ref,
  ) => {
    return (
      <section className="container" ref={ref} {...rest}>
        <div className={cn('py-16 md:py-20 lg:py-[120px]', className)}>
          <div className="flex flex-col gap-6 items-center text-center mx-auto w-full sm:max-w-[600px] mb-10 lg:mb-16">
            {timestamp && (
              <Typography variant="h6" className="font-normal text-grey-8">
                {timestamp}
              </Typography>
            )}
            {title && <Typography variant={heading}>{title}</Typography>}
            {animationTitle && (
              <Typography variant={heading}>
                <AnimatedText>{animationTitle}</AnimatedText>
              </Typography>
            )}
            {subtitle && <h2>{subtitle}</h2>}
            {description && (
              <Typography variant="h5" className="font-normal">
                {description}
              </Typography>
            )}
          </div>
          {children}
        </div>
      </section>
    );
  },
);

CenterAlignedLayout.displayName = 'CenterAlignedLayout';

export default CenterAlignedLayout;
