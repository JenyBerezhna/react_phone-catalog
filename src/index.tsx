import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { App } from './App';
import { FavoritesProvider } from './shared/context/FavoritesContext';
import { CartProvider } from './shared/context/CartContext';

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <FavoritesProvider>
      <CartProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </CartProvider>
    </FavoritesProvider>
  </React.StrictMode>,
);
