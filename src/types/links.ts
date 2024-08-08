export interface MobileMenuButtonProps {
  isOpen: boolean;
  onClick: () => void;
}

export interface NavItem {
  href: string;
  label: string;
  dropdownItems?: { label: string; href: string }[];
}

export interface SpecialLink {
  href: string;
  label: string;
  special?: boolean;
  withUnderline?: boolean;
}
