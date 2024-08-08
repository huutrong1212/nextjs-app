'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { NavItem, SpecialLink } from '@/types/links';

import { Button } from '@/components';
import { CardHover } from '@/components';
import { EDUTECH_TOOL_APP_URL } from '@/config';
import Link from 'next/link';
import NavLink from '@/components/navbar/nav-link';
import { cn } from '@/lib/utils';
import { useEffect } from 'react';

interface MobileMenuProps {
  isMobileMenuOpen: boolean;
  navLinks: NavItem[];
  specialLinks?: SpecialLink[];
  setIsMobileMenuOpen: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({
  isMobileMenuOpen,
  navLinks,
  specialLinks,
  setIsMobileMenuOpen,
}) => {
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }

    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [isMobileMenuOpen]);

  return (
    <div className={cn('xl:hidden')}>
      <button onClick={setIsMobileMenuOpen} aria-label="Toggle mobile menu">
        {isMobileMenuOpen ? <X width={24} height={24} /> : <Menu width={24} height={24} />}
      </button>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="absolute left-0 bg-white z-40 w-screen"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: '100vh' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
          >
            <div className="flex flex-col gap-4 p-6">
              {navLinks.map(({ href, label, dropdownItems }, index) =>
                dropdownItems ? (
                  <CardHover key={index} label={label} items={dropdownItems} />
                ) : (
                  <NavLink key={index} href={href}>
                    {label}
                  </NavLink>
                ),
              )}
              {specialLinks && <hr className="my-4 border-gray-300" />}

              <div className="flex flex-col gap-2 items-center">
                {specialLinks?.map(({ href, label, special, withUnderline }, index) =>
                  special ? (
                    <Button asChild>
                      <Link target="_blank" href={EDUTECH_TOOL_APP_URL || ''}>
                        {label}
                      </Link>
                    </Button>
                  ) : (
                    <NavLink key={index} href={href} withUnderline={withUnderline}>
                      {label}
                    </NavLink>
                  ),
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MobileMenu;
