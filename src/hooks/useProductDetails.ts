import { useEffect, useState } from 'react';
import { getProductDetails } from '../shared/helpers/products';
// eslint-disable-next-line max-len

import type { ProductDetails } from '../types/ProductDetails';

export const useProductDetails = (itemId: string) => {
  const [product, setProduct] = useState<ProductDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(false);

    if (!itemId) {
      setError(true);
      setLoading(false);

      return;
    }

    getProductDetails(itemId)
      .then(setProduct)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [itemId]);

  return { product, loading, error };
};
