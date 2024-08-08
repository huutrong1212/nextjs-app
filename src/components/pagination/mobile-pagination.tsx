import React from 'react';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from '@/components/index';

interface MobilePaginationProps {
  currentPage: number;
  totalPages: number;
  setPageIndex: (page: number) => void;
}

const MobilePagination: React.FC<MobilePaginationProps> = ({
  currentPage,
  totalPages,
  setPageIndex,
}) => {
  return totalPages > 0 ? (
    <div className="flex items-center gap-4">
      <Pagination className="w-fit">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              disabled={currentPage === 1}
              onClick={() => setPageIndex(currentPage - 2)}
            />
          </PaginationItem>

          <PaginationItem>
            <span className="mx-4">{`${currentPage} of ${totalPages}`}</span>
          </PaginationItem>

          <PaginationItem>
            <PaginationNext
              disabled={currentPage === totalPages}
              onClick={() => setPageIndex(currentPage)}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  ) : null;
};

export default MobilePagination;
