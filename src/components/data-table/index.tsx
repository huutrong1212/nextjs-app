'use client';

import React from 'react';
import { Card, MobilePagination, Pagination2 } from '@/components';
import { NotFoundIcon } from '@/public/icons';
import { IPost } from '@/types/post';
import { useSearchParams } from 'next/navigation';
import useTable from './useTable';

interface DataTableProps {
  data: IPost[];
  actions?: React.ReactNode;
  pathName?: string;
  totalPages?: number;
}

const DataTable: React.FC<DataTableProps> = ({ data, actions, pathName, totalPages }) => {
  const searchParams = useSearchParams();
  const { pagination, setPageIndex, resetPagination } = useTable({ size: 6 });
  const isEmpty = data.length === 0;

  React.useEffect(() => {
    const params = Array.from(searchParams.keys());
    const hasRelevantParams = params.some((param) => param !== 'page' && param !== 'size');

    if (hasRelevantParams) {
      resetPagination();
    }
  }, [searchParams]);

  return (
    <div className="flex flex-col gap-14 mt-16 md:mt-20 lg:mt-[120px]">
      {actions && (
        <div className="flex flex-wrap gap-4 justify-center lg:justify-end">{actions}</div>
      )}
      {isEmpty ? (
        <div className="w-full flex flex-col items-center justify-center text-sm">
          <NotFoundIcon />
          <p className="text-shadow-neutral70 text-xl text-center mt-8 font-bold">No data</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-20 gap-y-10 justify-items-center">
            {data.map((item, index) => (
              <Card key={index} data={item} href={`${pathName}/${item.slug}`} />
            ))}
          </div>
          <div className="mx-auto">
            <div className="hidden lg:flex">
              <Pagination2
                currentPage={pagination.pageIndex + 1}
                totalPages={totalPages || 1}
                setPageIndex={setPageIndex}
              />
            </div>
            <div className="lg:hidden">
              <MobilePagination
                currentPage={pagination.pageIndex + 1}
                totalPages={totalPages || 1}
                setPageIndex={setPageIndex}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default DataTable;
