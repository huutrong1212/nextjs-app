'use client';

import React, { useEffect, useState } from 'react';
import { baseAuthQuery, basePublicUrl } from '@/services/base-query';

import { ContentType } from '@/types/common';
import { IPost } from '@/types/post';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface CardProps {
  data: IPost;
  href?: string;
}

const Card: React.FC<CardProps> = ({ data, href = '' }) => {
  const {
    thumbnail,
    title,
    description,
    linkText = 'Read now',
    timeToRead,
    content_type,
    location,
  } = data;
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    const fetchImage = async () => {
      setIsLoading(true);
      setIsError(false);

      try {
        const response = await fetch(
          `${basePublicUrl}/file/objects?path=${encodeURIComponent(thumbnail)}`,
          {
            ...baseAuthQuery(),
          },
        );
        if (!response.ok) {
          throw new Error('Failed to fetch image');
        }
        const imageData = await response.json();
        setImageSrc(imageData.data[0].url);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchImage();
  }, [thumbnail]);

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  const handleImageError = () => {
    setIsLoading(false);
    setIsError(true);
  };

  const contentTypeToLinkTextMap = {
    [ContentType.CONTENT_TYPE_PDF]: 'Download eBook',
    [ContentType.CONTENT_TYPE_STORY]: 'Read full story',
    [ContentType.CONTENT_TYPE_EBOOK]: 'Read now',
    [ContentType.CONTENT_TYPE_VIDEO]: 'Watch now',
  };

  return (
    <div className="flex flex-col gap-6 max-w-sm w-full overflow-hidden">
      {!isLoading && !isError ? (
        <div className="w-full h-[368px] overflow-hidden relative rounded-lg group">
          <Image
            src={imageSrc || ''}
            alt={title}
            width={500}
            height={500}
            className="w-full h-full rounded-lg object-cover transition-transform duration-300 ease-in-out cursor-pointer group-hover:scale-110"
            onLoad={handleImageLoad}
            onError={handleImageError}
          />
        </div>
      ) : (
        <div className="bg-muted w-full h-[368px] rounded-lg" />
      )}
      {title && (
        <Link href={href} legacyBehavior>
          <h3 className="text-2xl font-bold transition-colors duration-300 ease-in-out hover:text-primary cursor-pointer">
            {title}
          </h3>
        </Link>
      )}
      {description && <p className="text-base line-clamp-3">{description}</p>}
      {timeToRead && <p className="text-base">Time: {timeToRead}</p>}
      <div>
        <Link href={href} legacyBehavior>
          <a
            className="border-b border-black rounded-none text-base font-normal cursor-pointer transition-colors 
              duration-300 ease-in-out hover:text-primary hover:border-primary"
          >
            {contentTypeToLinkTextMap[content_type] || linkText}
          </a>
        </Link>
      </div>
    </div>
  );
};

export default Card;
