'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useState } from 'react';

import DesktopMenu from '@/components/navbar/desktop-menu';
import Link from 'next/link';
import { LogoIcon } from '@/public/icons';
import MobileMenu from '@/components/navbar/mobile-menu';
import { Routes } from '@/types/routes';
import { usePathname } from 'next/navigation';
import { EDUTECH_TOOL_APP_URL } from '@/config';

const MainNavbar = () => {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const boxShadow = useTransform(
    scrollY,
    [0, 100],
    ['0px 0px 0px rgba(0,0,0,0.1)', '0px 2px 4px rgba(0,0,0,0.2)'],
  );
  const backgroundColor = useTransform(scrollY, [0, 100], ['#F7FDFD', '#FFFFFF']);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const isHomePage = pathname === '/';

  const navLinks = [
    {
      href: Routes.solutions,
      label: 'Solutions',
      dropdownItems: [{ label: 'Solution', href: Routes.solutions }],
    },
    { label: 'About Us', href: Routes.aboutUs },
    {
      href: Routes.resources.blog,
      label: 'Resources',
      dropdownItems: [
        { label: 'Blog', href: Routes.resources.blog },
        { label: 'eBooks & insights', href: Routes.resources.eBooksInsights },
        { label: 'Customer stories', href: Routes.resources.customerStories },
        { label: 'Webinars & videos', href: Routes.resources.webinarsVideos },
        { label: 'Product guides', href: Routes.resources.productGuides },
        { label: 'Developer docs', href: Routes.resources.developerDocs },
      ],
    },
    { label: 'Pricing', href: Routes.pricing },
    { label: 'Contact Sales', href: Routes.contactSales },
  ];

  const specialLinks = [
    { href: EDUTECH_TOOL_APP_URL, label: 'Sign Up', withUnderline: false },
    { href: Routes.requestDemo, label: 'Request for Demo', special: true },
  ];

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  return (
    <motion.header
      className="sticky top-0 z-50 w-full"
      style={{
        boxShadow: isHomePage ? boxShadow : '0px 2px 4px rgba(0,0,0,0.2)',
        backgroundColor: isHomePage && !isMobileMenuOpen ? backgroundColor : 'white',
      }}
    >
      <div className="flex items-center px-6 xl:container py-6 lg:py-10">
        <Link href="/" passHref>
          <LogoIcon />
        </Link>
        <DesktopMenu navLinks={navLinks} specialLinks={specialLinks} />
        <MobileMenu
          isMobileMenuOpen={isMobileMenuOpen}
          setIsMobileMenuOpen={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          navLinks={navLinks}
          specialLinks={specialLinks}
        />
      </div>
    </motion.header>
  );
};

export default MainNavbar;
