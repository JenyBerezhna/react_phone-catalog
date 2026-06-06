import { useEffect, useState } from 'react';
import { ProductDetails } from '../../types/ProductDetails';
import { getProductDetails } from '../../shared/helpers/products';

export const useItemDetails = (itemId: string) => {
  const [item, setItem] = useState<ProductDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(false);

    getProductDetails(itemId)
      .then(setItem)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [itemId]);

  return { item, loading, error };
};
