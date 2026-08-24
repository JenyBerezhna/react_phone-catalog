import { useEffect, useState } from 'react';

import { Product, ProductDetails } from '../types';

export const useSuggestedProducts = (
  product: ProductDetails | null,
  allProducts: Product[],
) => {
  const [suggested, setSuggested] = useState<Product[]>([]);
  const [loadingSuggested, setLoadingSuggested] = useState(true);

  useEffect(() => {
    if (!product) {
      setSuggested([]);
      setLoadingSuggested(false);

      return;
    }

    setLoadingSuggested(true);

    const filtered = allProducts
      .filter(
        item =>
          item.category === product.category &&
          item.itemId !== product.id &&
          Math.abs(item.price - product.priceRegular) < 150,
      )
      .slice(0, 12);

    setSuggested(filtered);
    setLoadingSuggested(false);
  }, [product, allProducts]);

  return {
    suggested,
    loadingSuggested,
  };
};
