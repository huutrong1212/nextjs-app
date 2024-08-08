'use client';

import { NavItem, SpecialLink } from '@/types/links';
import { Button } from '@/components/ui';
import { CardHover } from '@/components';
import { EDUTECH_TOOL_APP_URL } from '@/config';
import Link from 'next/link';
import NavLink from '@/components/navbar/nav-link';
import React from 'react';
import { motion } from 'framer-motion';

interface DesktopMenuProps {
  navLinks: NavItem[];
  specialLinks: SpecialLink[];
}

const DesktopMenu: React.FC<DesktopMenuProps> = ({ navLinks, specialLinks }) => (
  <div className="flex flex-grow">
    <div className="hidden xl:flex gap-6 items-center mx-auto">
      {navLinks.map(({ href, label, dropdownItems }, index) =>
        dropdownItems ? (
          <CardHover key={index} label={label} items={dropdownItems} />
        ) : (
          <NavLink key={index} href={href}>
            {label}
          </NavLink>
        ),
      )}
    </div>
    <div className="hidden xl:flex gap-6 items-center">
      {specialLinks.map(({ href, label, special, withUnderline }, index) => {
        return special ? (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Button asChild>
              <Link target="_blank" href={EDUTECH_TOOL_APP_URL}>
                {label}
              </Link>
            </Button>
          </motion.div>
        ) : (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <NavLink href={href} withUnderline={withUnderline}>
              {label}
            </NavLink>
          </motion.div>
        );
      })}
    </div>
  </div>
);

export default DesktopMenu;
