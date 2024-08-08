import React from 'react';
import Image from 'next/image';

interface CoreValueItemProps {
  imageUrl: string;
  title: string;
  content: string;
}

const CoreValueItem: React.FC<CoreValueItemProps> = ({ imageUrl, title, content }) => {
  return (
    <div className="flex flex-col gap-6 max-w-sm">
      <div className="overflow-hidden rounded-md w-40">
        <Image
          src={imageUrl}
          alt={title}
          width={160}
          height={160}
          className="h-auto w-auto object-cover transition-all hover:scale-105 aspect-square"
        />
      </div>

      <div className="font-bold text-2xl line-clamp-2 transition-colors duration-300 ease-in-out hover:text-primary cursor-pointer">
        {title}
      </div>
      <p className="text-base line-clamp-4">{content}</p>
    </div>
  );
};

export default CoreValueItem;
