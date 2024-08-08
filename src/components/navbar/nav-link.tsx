import { cn } from '@/lib/utils';
import Link from 'next/link';
import { FC } from 'react';

interface NavLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  children: React.ReactNode;
  special?: boolean;
  className?: string;
  withUnderline?: boolean;
}

const NavLink: FC<NavLinkProps> = ({
  href,
  children,
  className,
  withUnderline = true,
  ...props
}) => (
  <Link href={href} {...props} legacyBehavior>
    <a
      className={cn(
        'text-base ',
        withUnderline
          ? 'font-normal hover:underline hover:underline-offset-4 hover:decoration-primary hover:decoration-4'
          : 'font-semibold',
        className,
      )}
    >
      {children}
    </a>
  </Link>
);

export default NavLink;
