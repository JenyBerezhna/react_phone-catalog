import { useLocation } from 'react-router-dom';
import { useState, useEffect, useMemo } from 'react';
import { getProducts } from '../../shared/helpers/products';
import { Product } from '../../types/Product';

export const useBreadcrumbs = () => {
  const location = useLocation();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    getProducts().then(setProducts);
  }, []);

  const parts = location.pathname.split('/').filter(Boolean);

  return useMemo(() => {
    // Product details page: /product/:itemId
    if (parts[0] === 'product' && parts[1]) {
      const product = products.find(p => p.itemId === parts[1]);

      if (product) {
        const category = product.category;

        return [
          { label: 'Home', to: '/' },
          {
            label: category[0].toUpperCase() + category.slice(1),
            to: `/${category}`,
          },
          { label: product.name, to: undefined },
        ];
      }
    }

    // Default
    return parts.map((part, index) => {
      const path = '/' + parts.slice(0, index + 1).join('/');

      return {
        label: part[0].toUpperCase() + part.slice(1),
        to: index === parts.length - 1 ? undefined : path,
      };
    });
  }, [parts, products]);
};
