import { createContext, useContext, useEffect, useState } from 'react';
import { Product } from '../../types/Product';

type FavoritesContextValue = {
  favorites: Product[];
  toggleFavorite: (product: Product) => void;
};

const FavoritesContext = createContext<FavoritesContextValue | null>(null);

export const FavoritesProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [favorites, setFavorites] = useState<Product[]>([]);

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('favorites');

    if (saved) {
      setFavorites(JSON.parse(saved));
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (product: Product) => {
    setFavorites(prev =>
      prev.some(p => p.id === product.id)
        ? prev.filter(p => p.id !== product.id)
        : [...prev, product],
    );
  };

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavoritesContext = () => {
  const ctx = useContext(FavoritesContext);

  if (!ctx) {
    throw new Error('must be used inside FavoritesProvider');
  }

  return ctx;
};
