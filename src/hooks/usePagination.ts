import { useMemo } from 'react';
import { Product } from '../types/Product';

type PerPage = number | 'all';

export const usePagination = ({
  products,
  params,
  setParam,
}: {
  products: Product[];
  params: Record<string, string>;
  setParam: (key: string, value: string | null) => void;
}) => {
  // Parse page
  const page = Number(params.page) > 0 ? Number(params.page) : 1;

  // Parse perPage
  const perPage: PerPage =
    params.perPage === 'all'
      ? 'all'
      : Number(params.perPage) > 0
        ? Number(params.perPage)
        : 'all';

  const totalPages =
    perPage === 'all' ? 1 : Math.max(1, Math.ceil(products.length / perPage));

  const safePage = Math.min(page, totalPages);

  // Slice products
  const paginatedProducts = useMemo(() => {
    if (perPage === 'all') {
      return products;
    }

    const start = (safePage - 1) * perPage;

    return products.slice(start, start + perPage);
  }, [products, safePage, perPage]);

  // Update page
  const setPage = (newPage: number) => {
    if (newPage <= 1) {
      setParam('page', null);
    } else {
      setParam('page', String(newPage));
    }
  };

  const setPerPage = (value: string) => {
    if (value === 'all') {
      setParam('perPage', null);
      setParam('page', null);
    } else {
      setParam('perPage', value);
      setParam('page', null);
    }
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
