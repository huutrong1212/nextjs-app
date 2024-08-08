'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { SearchIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { Routes } from '@/types/routes';
import { Input } from '@/components';
import { usePathname } from 'next/navigation';
import { LogoDevelopers } from '@/public/icons';
import NavLink from '@/components/navbar/nav-link';
import MobileMenu from '@/components/navbar/mobile-menu';

const DeveloperNavbar = () => {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Reference Docs', href: '/developer-docs/reference' },
    { label: 'SDK & Advanced', href: '/developer-docs/sdk' },
    { label: 'Releases', href: '/developer-docs/releases' },
  ];

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  return (
    <motion.header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="flex items-center md:container h-[70px] px-6">
        <div className="flex-1 flex items-center justify-between">
          <Link href={Routes.resources.developerDocs} passHref>
            <LogoDevelopers className="w-3/4 md:w-full" />
          </Link>
          <div className="hidden xl:flex items-center space-x-4">
            {navLinks.map((link, index) => (
              <motion.div
                key={link.label}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <NavLink href={link.href}>{link.label}</NavLink>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: navLinks.length * 0.1 }}
            >
              <Input icon={<SearchIcon className="w-5 h-5" />} placeholder="Search..." />
            </motion.div>
          </div>
        </div>

        <MobileMenu
          isMobileMenuOpen={isMobileMenuOpen}
          setIsMobileMenuOpen={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          navLinks={navLinks}
        />
      </div>
    </motion.header>
  );
};

export default DeveloperNavbar;
