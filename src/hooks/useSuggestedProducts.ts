import { useEffect, useState } from 'react';
import { getSuggestedProducts } from '../shared/helpers/getSuggestedProducts';
import { Product } from '../types/Product';

export const useSuggestedProducts = (itemId: string) => {
  const [suggested, setSuggested] = useState<Product[]>([]);
  const [loadingSuggested, setLoadingSuggested] = useState(true);
  const [errorSuggested, setErrorSuggested] = useState(false);

  useEffect(() => {
    setLoadingSuggested(true);

    getSuggestedProducts(itemId)
      .then(setSuggested)
      .catch(() => setErrorSuggested(true))
      .finally(() => setLoadingSuggested(false));
  }, [itemId]);

  return { suggested, loadingSuggested, errorSuggested };
};
