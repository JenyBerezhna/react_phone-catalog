import { useEffect, useState } from 'react';
import { Product, ProductDetails } from '../types';

export const useSuggestedProducts = (
  product: ProductDetails | null,
  allProducts: Product[],
) => {
  const [suggested, setSuggested] = useState<Product[]>([]);

  useEffect(() => {
    if (!product || allProducts.length === 0) {
      setSuggested([]);

      return;
    }

    const filtered = allProducts
      .filter(
        p =>
          p.category === product.category &&
          p.itemId !== product.id &&
          Math.abs(p.price - product.priceRegular) < 150,
      )
      .slice(0, 12);

    setSuggested(filtered);
  }, [product, allProducts]);

  return {
    suggested,
    loadingSuggested: false,
  };
};
