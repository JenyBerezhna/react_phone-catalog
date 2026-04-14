import { useEffect, useMemo } from 'react';
import { Product } from '../types/Product';

type PerPage = '4' | '8' | '16' | 'all';

export const usePagination = ({
  products,
  params,
  setParam,
}: {
  products: Product[];
  params: Record<string, string>;
  setParam: (key: string, value: string | null) => void;
}) => {
  // Parse perPage
  const perPage: PerPage =
    params.perPage === '4' ||
    params.perPage === '8' ||
    params.perPage === '16' ||
    params.perPage === 'all'
      ? params.perPage
      : 'all';

  // Parse page
  const page = Number(params.page) > 0 ? Number(params.page) : 1;

  // Total pages
  const totalPages =
    perPage === 'all'
      ? 1
      : Math.max(1, Math.ceil(products.length / Number(perPage)));

  // Clamp page
  const safePage = Math.min(page, totalPages);

  // If URL page is invalid → fix it
  useEffect(() => {
    if (safePage !== page) {
      setParam('page', safePage === 1 ? null : String(safePage));
    }
  }, [safePage, page, setParam]);

  // Slice products
  const paginatedProducts = useMemo(() => {
    if (perPage === 'all') {
      return products;
    }

    const start = (safePage - 1) * Number(perPage);

    return products.slice(start, start + Number(perPage));
  }, [products, safePage, perPage]);

  // Update page
  const setPage = (newPage: number) => {
    if (newPage <= 1) {
      setParam('page', null);
    } else {
      setParam('page', String(newPage));
    }
  };

  // Update perPage
  const setPerPage = (value: string) => {
    if (value === 'all') {
      setParam('perPage', null);
    } else {
      setParam('perPage', value);
    }

    // Always reset page
    setParam('page', null);
  };

  return {
    page: safePage,
    perPage,
    totalPages,
    paginatedProducts,
    setPage,
    setPerPage,
  };
};
