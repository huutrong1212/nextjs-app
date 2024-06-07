import { cn } from '@/lib/utils';
import React, { ReactNode } from 'react';

interface DefaultLayoutProps {
  children: ReactNode;
  className?: string;
}

const DefaultLayout: React.FC<DefaultLayoutProps> = ({ children, className }) => {
  return <section className={cn('p-20', className)}>{children}</section>;
};

export default DefaultLayout;
