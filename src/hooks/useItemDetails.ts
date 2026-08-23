import { useEffect, useState } from 'react';
import type { ProductDetails } from '../types/ProductDetails';

export const useItemDetails = (itemId: string) => {
  const [product, setProduct] = useState<ProductDetails | null>(null);
  const [variants, setVariants] = useState<ProductDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!itemId) {
      return;
    }

    const load = async () => {
      try {
        setLoading(true);

        // category = "phones", "tablets", "accessories"
        const category = itemId.split('-')[0];

        const response = await fetch(`/api/${category}.json`);

        if (!response.ok) {
          throw new Error('Failed to load item details');
        }

        const all: ProductDetails[] = await response.json();

        const current = all.find(p => p.id === itemId);

        if (!current) {
          throw new Error(`Item ${itemId} not found`);
        }

        const family = all.filter(p => p.namespaceId === current.namespaceId);

        setProduct(current);
        setVariants(family);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [itemId]);

  return { product, variants, loading, error };
};
