import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationFirstPage,
  PaginationItem,
  PaginationLastPage,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/index';
import React from 'react';

interface Pagination2Props {
  currentPage: number;
  totalPages: number;
  setPageIndex: (page: number) => void;
}

const PaginationFirst: React.FC<{ onClick: () => void; disabled: boolean }> = ({
  onClick,
  disabled,
}) => (
  <PaginationItem>
    <PaginationFirstPage onClick={onClick} disabled={disabled} />
  </PaginationItem>
);

const PaginationLast: React.FC<{ onClick: () => void; disabled: boolean }> = ({
  onClick,
  disabled,
}) => (
  <PaginationItem>
    <PaginationLastPage onClick={onClick} disabled={disabled} />
  </PaginationItem>
);

const Pagination2: React.FC<Pagination2Props> = ({ currentPage, totalPages, setPageIndex }) => {
  const [valuePage, setValuePage] = React.useState(currentPage.toString());

  React.useEffect(() => {
    if (Number(currentPage) !== Number(valuePage)) {
      setValuePage(currentPage.toString());
    }
  }, [currentPage, valuePage]);

  const goToFirstPage = () => {
    setPageIndex(0);
  };

  const goToLastPage = () => {
    setPageIndex(totalPages - 1);
  };

  return totalPages > 0 ? (
    <div className="flex items-center gap-4">
      <Pagination className="w-fit">
        <PaginationContent>
          <PaginationFirst onClick={goToFirstPage} disabled={currentPage === 1} />

          <PaginationItem>
            <PaginationPrevious
              disabled={currentPage === 1}
              onClick={() => setPageIndex(currentPage - 2)}
            />
          </PaginationItem>

          {totalPages < 5 ? (
            Array.from({ length: totalPages }).map((_, index: number) => (
              <PaginationItem key={index}>
                <PaginationLink
                  isActive={currentPage === index + 1}
                  onClick={() => setPageIndex(index)}
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))
          ) : (
            <>
              <PaginationItem>
                <PaginationLink isActive={1 === currentPage} onClick={() => setPageIndex(0)}>
                  1
                </PaginationLink>
              </PaginationItem>

              {currentPage > 4 && (
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
              )}

              {currentPage === totalPages && (
                <PaginationItem>
                  <PaginationLink onClick={() => setPageIndex(currentPage - 3)}>
                    {currentPage - 2}
                  </PaginationLink>
                </PaginationItem>
              )}

              {currentPage > 3 && currentPage < 5 && (
                <PaginationItem>
                  <PaginationLink onClick={() => setPageIndex(currentPage - 2)}>
                    {currentPage - 2}
                  </PaginationLink>
                </PaginationItem>
              )}

              {currentPage > 2 && (
                <PaginationItem>
                  <PaginationLink onClick={() => setPageIndex(currentPage - 2)}>
                    {currentPage - 1}
                  </PaginationLink>
                </PaginationItem>
              )}

              {currentPage !== 1 && currentPage !== totalPages && (
                <PaginationItem>
                  <PaginationLink isActive onClick={() => setPageIndex(currentPage - 1)}>
                    {currentPage}
                  </PaginationLink>
                </PaginationItem>
              )}

              {currentPage < totalPages - 1 && (
                <PaginationItem>
                  <PaginationLink onClick={() => setPageIndex(currentPage)}>
                    {currentPage + 1}
                  </PaginationLink>
                </PaginationItem>
              )}

              {currentPage === 1 && (
                <PaginationItem>
                  <PaginationLink onClick={() => setPageIndex(currentPage + 1)}>
                    {currentPage + 2}
                  </PaginationLink>
                </PaginationItem>
              )}

              {currentPage < totalPages - 2 && totalPages > 4 && currentPage > totalPages - 4 && (
                <PaginationItem>
                  <PaginationLink onClick={() => setPageIndex(currentPage + 1)}>
                    {currentPage + 2}
                  </PaginationLink>
                </PaginationItem>
              )}
              {currentPage < totalPages - 3 && totalPages > 4 && (
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
              )}

              {totalPages > 1 && (
                <PaginationItem>
                  <PaginationLink
                    isActive={currentPage === totalPages}
                    onClick={() => setPageIndex(totalPages - 1)}
                  >
                    {totalPages}
                  </PaginationLink>
                </PaginationItem>
              )}
            </>
          )}

          <PaginationItem>
            <PaginationNext
              disabled={currentPage === totalPages}
              onClick={() => setPageIndex(currentPage)}
            />
          </PaginationItem>

          <PaginationLast onClick={goToLastPage} disabled={currentPage === totalPages} />
        </PaginationContent>
      </Pagination>
    </div>
  ) : null;
};

export default Pagination2;
