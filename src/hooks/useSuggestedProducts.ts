import { useEffect, useState } from 'react';
import { Product, ProductDetails } from '../types';

export const useSuggestedProducts = (product: ProductDetails | null) => {
  const [suggested, setSuggested] = useState<Product[]>([]);
  const [loadingSuggested, setLoadingSuggested] = useState(true);
  const [errorSuggested, setErrorSuggested] = useState<string | null>(null);

  useEffect(() => {
    if (!product) {
      setSuggested([]);

      return;
    }

    setLoadingSuggested(true);
    setErrorSuggested(null);

    try {
      const allProducts: Product[] = JSON.parse(
        localStorage.getItem('products') || '[]',
      );

      const filtered = allProducts
        .filter(
          p =>
            p.category === product.category &&
            p.id !== product.id &&
            Math.abs(p.price - product.priceRegular) < 150,
        )
        .slice(0, 12);

      setSuggested(filtered);
    } catch {
      setErrorSuggested('Failed to load suggested products');
    } finally {
      setLoadingSuggested(false);
    }
  }, [product]);

  return { suggested, loadingSuggested, errorSuggested };
};
