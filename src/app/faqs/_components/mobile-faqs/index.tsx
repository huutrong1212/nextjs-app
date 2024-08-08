import React from 'react';
import { MobileDropdownMenu } from '@/components';
import { FaqsCategory } from '@/types/faqs';

interface MobileFAQsProps {
  faqData: FaqsCategory[];
  selectedCategory: string | null;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
  handleCategoryClick: (category: string) => void;
}

const MobileFAQs: React.FC<MobileFAQsProps> = ({
  faqData,
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
        items={faqData}
        selectedItem={selectedCategory}
        onItemClick={handleCategoryClick}
      />
    </div>
  );
};

export default MobileFAQs;
