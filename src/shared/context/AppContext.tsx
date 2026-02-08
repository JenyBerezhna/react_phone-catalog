import { createContext, useContext, useState } from 'react';
import { CartItem } from '../../types/CartItem';

type AppState = {
  favorites: string[];
  cart: CartItem[];
  addToFavorites: (id: string) => void;
  addToCart: (product: CartItem) => void;
};

const AppContext = createContext<AppState | null>(null);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToFavorites = (id: string) => {
    setFavorites(prev => (prev.includes(id) ? prev : [...prev, id]));
  };

  const addToCart = (product: CartItem) => {
    setCart(prev => [...prev, product]);
  };

  return (
    <AppContext.Provider
      value={{
        favorites,
        cart,
        addToFavorites,
        addToCart,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error('useAppContext must be used within AppProvider');
  }

  return context;
};
