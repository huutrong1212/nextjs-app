import { Typography } from '@/components/ui/index';
import { CheckedIcon } from '@/public/icons';
import React from 'react';

interface CheckedItemProps {
  content: string;
}

const CheckedItem: React.FC<CheckedItemProps> = ({ content }) => {
  return (
    <div className="flex gap-2 items-center">
      <CheckedIcon />
      <Typography variant="h5" className="font-normal">
        {content}
      </Typography>
    </div>
  );
};

export default CheckedItem;
