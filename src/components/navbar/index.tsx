'use client';

import DeveloperNavbar from '@/components/navbar/nav-developer';
import MainNavbar from '@/components/navbar/nav-main';
import { Routes } from '@/types/routes';
import { usePathname } from 'next/navigation';

export default function NavbarContainer() {
  const pathname = usePathname();
  const isDeveloperDocsRoute = pathname.startsWith(Routes.resources.developerDocs);
  return isDeveloperDocsRoute ? <DeveloperNavbar /> : <MainNavbar />;
}
