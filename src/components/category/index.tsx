import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface ContentProps {
  reverse?: boolean;
  imageSrc: string;
  title: string;
  description: string;
  linkHref: string;
}

const Category: React.FC<ContentProps> = ({
  reverse = false,
  imageSrc,
  title,
  description,
  linkHref,
}) => {
  return (
    <div
      className={`flex flex-col md:flex-row justify-between items-center ${
        reverse ? 'md:flex-row-reverse' : ''
      }`}
    >
      <div className={`md:w-1/2 ${reverse ? 'md:ml-20' : 'md:mr-20'}`}>
        <Image src={imageSrc} alt={imageSrc} width={500} height={500} className="w-full" />
      </div>
      <div className="hidden md:flex md:w-1/2 gap-4 flex-col">
        <h2 className="text-xl font-semibold">{title}</h2>
        <p className="text-gray-600">{description}</p>
        <Link href={linkHref} legacyBehavior>
          <a className="text-blue-500 hover:underline block pt-4">Learn more →</a>
        </Link>
      </div>
    </div>
  );
};

export default Category;
