import React from 'react';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
} from '@/components';
import { cn } from '@/lib/utils';

interface ModalProps {
  title?: string;
  description?: string;
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  classNameContent?: string;
  classNameFooter?: string;
  isShowClose?: boolean;
  dismissOnClickOutside?: boolean;
  styleContent?: React.CSSProperties;
  classNameClose?: string;
}

const Modal: React.FC<ModalProps> = ({
  title,
  description,
  isOpen,
  children,
  footer,
  classNameContent,
  classNameFooter,
  isShowClose,
  styleContent,
  dismissOnClickOutside = false,
  classNameClose,
  onClose,
}) => {
  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onChange}>
      <DialogOverlay dismissOnClickOutside={dismissOnClickOutside}>
        <DialogClose />
        <DialogContent
          className={classNameContent}
          style={styleContent}
          isShowClose={isShowClose}
          classNameClose={classNameClose}
        >
          {title && (
            <DialogHeader>
              {title && <DialogTitle>{title}</DialogTitle>}
              {description && <DialogDescription>{description}</DialogDescription>}
            </DialogHeader>
          )}

          {children}
          {footer && (
            <DialogFooter className={cn('sm:justify-start', classNameFooter)}>
              {footer}
            </DialogFooter>
          )}
        </DialogContent>
      </DialogOverlay>
    </Dialog>
  );
};

export default Modal;
