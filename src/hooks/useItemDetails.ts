import { useEffect, useState } from 'react';
import type { ProductDetails } from '../types/ProductDetails';

export const useItemDetails = (itemId: string) => {
  const [product, setProduct] = useState<ProductDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!itemId) {
      return;
    }

    const fetchDetails = async () => {
      try {
        setLoading(true);

        const response = await fetch(`/api/productDetails/${itemId}.json`);

        if (!response.ok) {
          throw new Error(`Failed to load product details for ${itemId}`);
        }

        const data: ProductDetails = await response.json();

        setProduct(data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('Unknown error');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [itemId]);

  return { product, loading, error };
};
