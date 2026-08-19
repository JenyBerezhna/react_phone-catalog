import { useEffect, useState } from 'react';
import { ProductDetails } from '../../types/ProductDetails';
import { getProductDetails } from '../../shared/helpers/products';

export const useItemDetails = (productId: string) => {
  const [product, setProduct] = useState<ProductDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(false);

    getProductDetails(productId)
      .then(setProduct)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [productId]);

  return { product, loading, error };
};
