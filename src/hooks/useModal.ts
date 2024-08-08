'use client';

import { useState } from 'react';

type UseModalReturnType = [boolean, () => void, () => void];
const useModal = (): UseModalReturnType => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = (): void => {
    setIsOpen(true);
  };

  const closeModal = (): void => {
    setIsOpen(false);
  };

  return [isOpen, openModal, closeModal];
};

export default useModal;
