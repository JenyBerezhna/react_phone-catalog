import './App.scss';

import { Routes, Route } from 'react-router-dom';
import { CartProvider } from './shared/context/CartContext';

import { Layout } from './components/Layout';
import { NotFoundPage } from './modules/NotFoundPage/NotFoundPage';

import { HomePage } from './modules/HomePage/HomePage';
import { CatalogPage } from './modules/CatalogPage/CatalogPage';
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

          <Route path="/phones" element={<CatalogPage type="phones" />} />
          <Route path="/tablets" element={<CatalogPage type="tablets" />} />
          <Route
            path="/accessories"
            element={<CatalogPage type="accessories" />}
          />

          <Route path="/product/:productId" element={<ProductDetailsPage />} />

          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/cart" element={<CartPage />} />

          <Route path="/product">
            <Route path=":productId" element={<ProductDetailsPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Route>
      </Routes>
    </CartProvider>
  </div>
);
