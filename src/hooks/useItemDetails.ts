import { useEffect, useState } from 'react';
import type { ProductDetails } from '../types/ProductDetails';

export const useItemDetails = (itemId: string, category: string) => {
  const [product, setProduct] = useState<ProductDetails | null>(null);
  const [variants, setVariants] = useState<ProductDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!itemId || !category) {
      setProduct(null);
      setVariants([]);
      setLoading(false);
      setError('Invalid item or category');

      return;
    }

    let cancelled = false;

    const load = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`/api/${category}.json`);

        if (!response.ok) {
          throw new Error('Failed to load item details');
        }

        const all: ProductDetails[] = await response.json();

        const current = all.find(item => item.id === itemId);

        if (!current) {
          throw new Error(`Item ${itemId} not found`);
        }

        const family = all.filter(
          item => item.namespaceId === current.namespaceId,
        );

        if (!cancelled) {
          setProduct(current);
          setVariants(family);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Unknown error');
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    load();

    return () => {
      cancelled = true;
    };
  }, [itemId, category]);

  return {
    product,
    variants,
    loading,
    error,
  };
};
