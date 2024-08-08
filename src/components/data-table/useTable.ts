'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react';

export const sizePages = [6, 10, 25, 50, 100, 150];

export interface UseTableProps {
  page?: number;
  size?: (typeof sizePages)[number];
  sort?: {
    id: string;
    desc: boolean;
  };
  prefix?: string;
}

const useTable = (initialValue?: UseTableProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isSorting, setIsSorting] = React.useState(false);

  const pageIndex = initialValue?.page ?? 0;
  const pageSize = initialValue?.size ?? 6;
  const defaultSort = initialValue?.sort ? [initialValue.sort] : [];

  const getNameWithPrefix = (name: string) => `${initialValue?.prefix ?? ''}${name}`;

  const getParamValue = (name: string, defaultValue: number) => {
    const value = searchParams.get(getNameWithPrefix(name));
    return value ? Number(value) : defaultValue;
  };

  const paramSize = getParamValue('size', pageSize);
  const paramPage = Math.max(getParamValue('page', pageIndex + 1) - 1, 0);
  const paramSort = searchParams.get(getNameWithPrefix('sort'))
    ? [
        {
          id: searchParams.get(getNameWithPrefix('sort'))!.split(',')[0],
          desc: searchParams.get(getNameWithPrefix('sort'))!.split(',')[1] === 'desc',
        },
      ]
    : defaultSort;

  const getPageSize = (size: number) => {
    if (!sizePages.includes(size)) {
      if (size <= 6) return 6;
      if (size <= 10) return 10;
      if (size <= 25) return 25;
      if (size <= 50) return 50;
      if (size <= 100) return 100;
      if (size > 100) return 150;
    }
    return size;
  };

  React.useEffect(() => {
    const updatedSearchParams = new URLSearchParams(searchParams.toString());
    if (paramSize !== 6) {
      updatedSearchParams.set(getNameWithPrefix('size'), getPageSize(paramSize).toString());
    }
    if (Number(searchParams.get(getNameWithPrefix('page'))) < 1) {
      updatedSearchParams.set(getNameWithPrefix('page'), '1');
    }
    if (!searchParams.get(getNameWithPrefix('sort')) && paramSort.length > 0) {
      updatedSearchParams.set(
        getNameWithPrefix('sort'),
        `${paramSort[0]?.id},${paramSort[0]?.desc ? 'desc' : 'asc'}`,
      );
    }
    router.replace(`${window.location.pathname}?${updatedSearchParams.toString()}`);
  }, [paramSize, paramSort, searchParams, router]);

  const [sorting, setSorting] = React.useState<{ id: string; desc: boolean }[]>(paramSort);
  const [pagination, setPagination] = React.useState<{ pageIndex: number; pageSize: number }>({
    pageIndex: paramPage,
    pageSize: getPageSize(paramSize),
  });

  const updateURL = (updatedParams: URLSearchParams) => {
    router.replace(`${window.location.pathname}?${updatedParams.toString()}`);
  };

  React.useEffect(() => {
    const updatedSearchParams = new URLSearchParams(searchParams.toString());
    if (pagination.pageIndex !== paramPage) {
      updatedSearchParams.set(getNameWithPrefix('page'), (pagination.pageIndex + 1).toString());
    }
    if (pagination.pageSize !== paramSize) {
      updatedSearchParams.set(getNameWithPrefix('size'), pagination.pageSize.toString());
    }
    if (sorting[0]) {
      updatedSearchParams.set(
        getNameWithPrefix('sort'),
        `${sorting[0]?.id},${sorting[0]?.desc ? 'desc' : 'asc'}`,
      );
    }
    updateURL(updatedSearchParams);
  }, [pagination, sorting, searchParams, router, paramPage, paramSize]);

  const setPageIndex = (pageIndex: number) => {
    setPagination((prev) => ({ ...prev, pageIndex }));
  };

  const setPageSize = (pageSize: number) => {
    setPagination((prev) => ({ ...prev, pageSize }));
  };

  const resetPagination = () => {
    setPagination({ pageIndex, pageSize });
  };

  const resetSorting = () => {
    setSorting(defaultSort);
  };

  const resetParams = () => {
    setSorting(defaultSort);
    setPagination({ pageIndex, pageSize });
  };

  React.useEffect(() => {
    if (isSorting) {
      const updatedSearchParams = new URLSearchParams(searchParams.toString());
      if (sorting[0]) {
        updatedSearchParams.set(
          getNameWithPrefix('sort'),
          `${sorting[0]?.id},${sorting[0]?.desc ? 'desc' : 'asc'}`,
        );
        updatedSearchParams.delete(getNameWithPrefix('page'));
        setPageIndex(0);
      } else {
        updatedSearchParams.delete(getNameWithPrefix('sort'));
        updatedSearchParams.delete(getNameWithPrefix('page'));
      }
      updateURL(updatedSearchParams);
      setIsSorting(false);
    }
  }, [sorting, isSorting, searchParams, router]);

  return {
    params: {
      ...(sorting[0]
        ? {
            sort: sorting[0]?.id,
            direction: sorting[0]?.desc ? 'desc' : 'asc',
          }
        : {}),
      page: pagination.pageIndex + 1,
      size: pagination.pageSize,
    },
    pageable: {
      'pageable.page': pagination.pageIndex + 1,
      'pageable.size': pagination.pageSize,
      ...(sorting[0]
        ? { 'pageable.sort': `${sorting[0]?.id},${sorting[0]?.desc ? 'desc' : 'asc'}` }
        : {}),
    },
    sorting,
    pagination,
    setSorting: (e: React.SetStateAction<{ id: string; desc: boolean }[]>) => {
      setSorting(e);
      setIsSorting(true);
    },
    setPagination,
    resetParams,
    setPageIndex,
    setPageSize,
    resetPagination,
    resetSorting,
  };
};

export default useTable;
