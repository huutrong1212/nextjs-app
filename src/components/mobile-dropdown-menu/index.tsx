import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Typography,
} from '@/components';

import { MenuIcon } from '@/public/icons';
import React from 'react';
import { Subcategory } from '@/types/dev';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Category {
  title?: string;
  subcategories: (Subcategory | string)[];
}

interface MobileDropdownMenuProps {
  isOpen: boolean;
  items: Category[];
  selectedItem: string | null;
  onToggle: () => void;
  onItemClick: (item: string) => void;
}

const MobileDropdownMenu: React.FC<MobileDropdownMenuProps> = ({
  isOpen,
  items,
  selectedItem,
  onToggle,
  onItemClick,
}) => {
  return (
    <DropdownMenu open={isOpen} onOpenChange={onToggle}>
      <DropdownMenuTrigger asChild>
        <button
          className="focus:outline-none py-4 px-6 w-full flex justify-between items-center bg-teal-1 shadow-md"
          onClick={onToggle}
        >
          Open Menu
          {isOpen ? <X /> : <MenuIcon />}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="h-screen w-screen p-0" sideOffset={0}>
        <DropdownMenuGroup>
          {items.map((category, index) => (
            <React.Fragment key={index}>
              {category.title && (
                <Typography variant="h5" className="px-6 py-2">
                  {category.title}
                </Typography>
              )}
              {category.subcategories.map((subcategory, subIndex) => (
                <DropdownMenuItem
                  key={subIndex}
                  onClick={() =>
                    onItemClick(
                      typeof subcategory === 'string'
                        ? `${index}-${subIndex}-${subcategory}`
                        : subcategory.subId,
                    )
                  }
                  className={cn(
                    'px-6 py-2 text-base',
                    selectedItem ===
                      (typeof subcategory === 'string'
                        ? `${index}-${subIndex}-${subcategory}`
                        : subcategory.subId)
                      ? 'bg-teal-1 text-primary font-semibold'
                      : 'hover:bg-grey-4',
                  )}
                >
                  {typeof subcategory === 'string' ? subcategory : subcategory.subTitle}
                </DropdownMenuItem>
              ))}
            </React.Fragment>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MobileDropdownMenu;
