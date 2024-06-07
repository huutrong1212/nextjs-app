import Link from 'next/link';
import LogoIcon from '../../../public/icons/logo';
import { Button } from '@/components/ui/index';
import { Dropdown } from '@/components/index';

const Navbar = () => {
  const navLinks = [
    { href: '/', label: 'Solutions', dropdownItems: ['Solution 1', 'Solution 2', 'Solution 3'] },
    { href: '/about-us', label: 'About Us' },
    { href: '/', label: 'Resources', dropdownItems: ['Resource 1', 'Resource 2', 'Resource 3'] },
    { href: '/pricing', label: 'Pricing' },
    { href: '/contact-sales', label: 'Contact Sales' },
  ];

  const specialLinks = [
    { href: '/sign-up', label: 'Sign Up' },
    { href: '/request-demo', label: 'Request for Demo', special: true },
  ];

  return (
    <nav className="bg-white p-4 shadow-md sticky top-0">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-xl font-bold text-black">
          <Link href="/" passHref>
            <LogoIcon />
          </Link>
        </div>
        <div className="space-x-4 flex items-center">
          {navLinks.map(({ href, label, dropdownItems }) =>
            dropdownItems ? (
              <Dropdown key={href} label={label} items={dropdownItems} />
            ) : (
              <NavLink key={href} href={href}>
                {label}
              </NavLink>
            ),
          )}
        </div>
        <div className="space-x-4 flex items-center">
          {specialLinks.map(({ href, label, special }) =>
            special ? (
              <Button key={href}>{label}</Button>
            ) : (
              <NavLink key={href} href={href} special={special}>
                {label}
              </NavLink>
            ),
          )}
        </div>
      </div>
    </nav>
  );
};

const NavLink = ({ href, children, special }: any) => (
  <Link href={href} legacyBehavior>
    <a
      className={`text-gray-700 hover:text-black ${
        special ? 'bg-teal-500 text-white px-4 py-2 rounded' : ''
      }`}
    >
      {children}
    </a>
  </Link>
);

export default Navbar;
