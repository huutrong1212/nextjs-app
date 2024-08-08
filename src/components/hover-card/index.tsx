'use client';

import React, { useState } from 'react';
import {
  Typography,
  HoverCard as HoverCardPlatform,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui';
import { Icon } from '@iconify/react';
import Link from 'next/link';

interface CustomDropdownProps {
  label: string;
  items: { label: string; href: string }[];
}

const HoverCard: React.FC<CustomDropdownProps> = ({ label, items }) => {
  const [open, setOpen] = useState<boolean>(false);

  const handleClick = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  return (
    <HoverCardPlatform open={open} onOpenChange={setOpen} openDelay={0} closeDelay={50}>
      <HoverCardTrigger className="group cursor-pointer" asChild>
        <div className="flex gap-1" onClick={handleClick}>
          <Typography
            variant="h5"
            className="font-normal hover:underline hover:underline-offset-4 hover:decoration-primary hover:decoration-4"
          >
            {label}
          </Typography>
          <Icon
            icon="mingcute:down-fill"
            className={`group-data-[state=open]:rotate-180 transition-all duration-300 ml-2 text-primary w-6 h-6 ${
              open ? 'rotate-180' : ''
            }`}
          />
        </div>
      </HoverCardTrigger>
      <HoverCardContent className="w-40 flex flex-col gap-5" align="start" sideOffset={10}>
        {items?.map((item, index) => (
          <Link key={index} href={item.href} passHref>
            <Typography variant="h6" className="cursor-pointer hover:text-primary font-normal">
              {item.label}
            </Typography>
          </Link>
        ))}
      </HoverCardContent>
    </HoverCardPlatform>
  );
};

export default HoverCard;
