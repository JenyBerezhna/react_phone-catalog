import { NavLink } from 'react-router-dom';
import { useState } from 'react';

import { useFavorites } from '../../shared/context/FavoritesContext';
import { useCart } from '../../shared/context/CartContext';

import styles from './Header.module.scss';

const getNavClass = ({ isActive }: { isActive: boolean }) =>
  isActive ? `${styles.link} ${styles.active}` : styles.link;

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // ✅ Get real data from your contexts
  const { favorites } = useFavorites();
  const { items: cart } = useCart();

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const favoritesCount = favorites.length;

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        {/* Logo */}
        <NavLink to="/" replace className={styles.logo}>
          <img src="/img/logo/Logo.svg" alt="Logo" />
        </NavLink>

        {/* Desktop navigation */}
        <nav className={styles.navDesktop}>
          <NavLink to="/" end className={getNavClass}>
            Home
          </NavLink>
          <NavLink to="/phones" className={getNavClass}>
            Phones
          </NavLink>
          <NavLink to="/tablets" className={getNavClass}>
            Tablets
          </NavLink>
          <NavLink to="/accessories" className={getNavClass}>
            Accessories
          </NavLink>
        </nav>

        {/* Desktop actions */}
        <div className={styles.actionsDesktop}>
          {/* Favorites */}
          <NavLink to="/favorites" className={styles.icon}>
            <img
              src={
                favoritesCount === 0
                  ? '/img/icons/FavoriteEmpty.svg'
                  : '/img/icons/FavoritesFilled.svg'
              }
              alt="Favorites"
            />

            {favoritesCount > 0 && (
              <span className={styles.counter}>{favoritesCount}</span>
            )}
          </NavLink>

          {/* Cart */}
          <NavLink to="/cart" className={styles.icon}>
            <img
              src={
                cartCount === 0
                  ? '/img/icons/CartEmpty.svg'
                  : '/img/icons/CartFilled.svg'
              }
              alt="Cart"
            />

            {cartCount > 0 && (
              <span className={styles.counter}>{cartCount}</span>
            )}
          </NavLink>
        </div>

        {/* Mobile burger */}
        <button className={styles.burger} onClick={() => setIsMenuOpen(true)}>
          <img src="/img/icons/Menu.svg" alt="Menu" />
        </button>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className={styles.mobileMenu}>
            {/* Top bar */}
            <div className={styles.mobileTop}>
              <NavLink
                to="/"
                replace
                className={styles.mobileLogo}
                onClick={() => setIsMenuOpen(false)}
              >
                <img src="/img/logo/Logo.svg" alt="Logo" />
              </NavLink>

              <button
                className={styles.close}
                onClick={() => setIsMenuOpen(false)}
              >
                <img src="/img/icons/Close.svg" alt="Close" />
              </button>
            </div>

            {/* Mobile navigation */}
            <nav className={styles.navMobile}>
              <NavLink
                to="/"
                end
                className={getNavClass}
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </NavLink>
              <NavLink
                to="/phones"
                className={getNavClass}
                onClick={() => setIsMenuOpen(false)}
              >
                Phones
              </NavLink>
              <NavLink
                to="/tablets"
                className={getNavClass}
                onClick={() => setIsMenuOpen(false)}
              >
                Tablets
              </NavLink>
              <NavLink
                to="/accessories"
                className={getNavClass}
                onClick={() => setIsMenuOpen(false)}
              >
                Accessories
              </NavLink>
            </nav>

            {/* Mobile actions */}
            <div className={styles.mobileActions}>
              {/* Favorites */}
              <NavLink
                to="/favorites"
                className={styles.icon}
                onClick={() => setIsMenuOpen(false)}
              >
                <img
                  src={
                    favoritesCount === 0
                      ? '/img/icons/FavoriteEmpty.svg'
                      : '/img/icons/FavoritesFilled.svg'
                  }
                  alt="Favorites"
                />

                {favoritesCount > 0 && (
                  <span className={styles.counter}>{favoritesCount}</span>
                )}
              </NavLink>

              {/* Cart */}
              <NavLink
                to="/cart"
                className={styles.icon}
                onClick={() => setIsMenuOpen(false)}
              >
                <img
                  src={
                    cartCount === 0
                      ? '/img/icons/CartEmpty.svg'
                      : '/img/icons/CartFilled.svg'
                  }
                  alt="Cart"
                />

                {cartCount > 0 && (
                  <span className={styles.counter}>{cartCount}</span>
                )}
              </NavLink>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
