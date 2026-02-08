import { useMemo } from 'react';
import { Product } from '../types/Product';

type SortKey = 'age' | 'title' | 'price';

const getFinalPrice = (product: Product) => product.price ?? product.fullPrice;

export const useSort = (
  products: Product[],
  params: Record<string, string>,
  setParam: (key: string, value: string | null) => void,
) => {
  const sort: SortKey =
    params.sort === 'title' || params.sort === 'price' || params.sort === 'age'
      ? params.sort
      : 'age';

  const sortedProducts = useMemo(() => {
    const items = [...products];

    switch (sort) {
      case 'title':
        return items.sort((a, b) => a.name.localeCompare(b.name));

      case 'price':
        return items.sort((a, b) => getFinalPrice(a) - getFinalPrice(b));

      case 'age':
      default:
        return items.sort((a, b) => b.year - a.year);
    }
  }, [products, sort]);

  const setSort = (value: SortKey) => {
    setParam('sort', value);
    setParam('page', null); // reset pagination
  };

  return {
    sort,
    sortedProducts,
    setSort,
  };
};
