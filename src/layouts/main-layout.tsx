import React, { ReactNode, HTMLProps, forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface MainLayoutProps extends HTMLProps<HTMLDivElement> {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  ref?: React.Ref<HTMLDivElement>;
}

const MainLayout = forwardRef<HTMLDivElement, MainLayoutProps>(
  ({ children, className, style, ...sectionProps }, ref) => {
    return (
      <section
        ref={ref}
        className={cn('py-20 lg:py-[120px]', className)}
        style={style}
        {...sectionProps}
      >
        <div className="container">{children}</div>
      </section>
    );
  },
);

export default MainLayout;
