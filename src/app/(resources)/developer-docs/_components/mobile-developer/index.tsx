import { DevCategory } from '@/types/dev';
import { MobileDropdownMenu } from '@/components';
import React from 'react';

interface MobileDeveloperProps {
  devData: DevCategory[];
  selectedCategory: string | null;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
  handleCategoryClick: (category: string) => void;
}

const MobileDeveloper: React.FC<MobileDeveloperProps> = ({
  devData,
  isMobileMenuOpen,
  selectedCategory,
  handleCategoryClick,
  setIsMobileMenuOpen,
}) => {
  return (
    <div className="md:hidden">
      <MobileDropdownMenu
        isOpen={isMobileMenuOpen}
        onToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        items={devData}
        selectedItem={selectedCategory}
        onItemClick={handleCategoryClick}
      />
    </div>
  );
};

export default MobileDeveloper;
