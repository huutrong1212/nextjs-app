'use client';

import { Button, DangerouslyHTML, Modal } from '@/components';

import { DownloadForm } from '@/app/(resources)/ebooks-and-insights/_components';
import { IPost } from '@/types/post';
import React from 'react';
import useModal from '@/hooks/useModal';

interface EBookDetailsProps {
  post: IPost;
}

const EBookDetails: React.FC<EBookDetailsProps> = ({ post }) => {
  const { content = '', pdf = '' } = post;
  const [isOpen, openFormModal, closeFormModal] = useModal();

  return (
    <>
      <div className="px-0 lg:px-48 flex flex-col gap-6 items-center">
        <div className="w-2/3	mx-auto">
          <DangerouslyHTML content={content ?? 'Fallback content'} />
        </div>

        <div>
          <Button onClick={openFormModal}>Download eBook</Button>
        </div>
      </div>

      <Modal
        isOpen={isOpen}
        onClose={closeFormModal}
        classNameContent="lg:w-[600px] sm:max-w-[unset]"
        title="Download the eBook"
      >
        <DownloadForm onCompleted={closeFormModal} pdf={pdf} />
      </Modal>
    </>
  );
};

export default EBookDetails;
