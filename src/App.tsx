import './App.scss';

import { Routes, Route } from 'react-router-dom';
import { CartProvider } from './shared/context/CartContext';

import { Layout } from './components/Layout';
import { NotFoundPage } from './modules/NotFoundPage/NotFoundPage';

import { HomePage } from './modules/HomePage/HomePage';
import { ProductsPage } from './modules/ProductPage/ProductPage';
// eslint-disable-next-line max-len
import { ProductDetailsPage } from './modules/ProductDetailsPage/ProductDetailsPage';
import { FavoritesPage } from './modules/FavoritesPage/FavoritesPage';
import { CartPage } from './modules/CartPage/CartPage';

export const App = () => (
  <div className="App">
    <CartProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />

          <Route path="/phones" element={<ProductsPage type="phones" />} />
          <Route path="/tablets" element={<ProductsPage type="tablets" />} />
          <Route
            path="/accessories"
            element={<ProductsPage type="accessories" />}
          />

          <Route path="/product/:productId" element={<ProductDetailsPage />} />

          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/cart" element={<CartPage />} />

          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </CartProvider>
  </div>
);
