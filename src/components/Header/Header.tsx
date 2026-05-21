import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import { useAppContext } from '../../shared/context/AppContext';
import styles from './Header.module.scss';

const getNavClass = ({ isActive }: { isActive: boolean }) =>
  isActive ? `${styles.link} ${styles.active}` : styles.link;

export const Header = () => {
  const { favorites, cart } = useAppContext();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        {/* Logo */}
        <NavLink to="/" replace className={styles.logo}>
          <img src="/img/logo/Nice Gadgets.svg" alt="Logo" />
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
          <NavLink to="/favorites" className={styles.icon}>
            <img src="/img/icons/Favourites (Heart Like).svg" alt="Favorites" />
            {favorites.length > 0 && (
              <span className={styles.counter}>{favorites.length}</span>
            )}
          </NavLink>

          <NavLink to="/cart" className={styles.icon}>
            <img
              src={
                cartCount === 0
                  ? '/img/icons/CartEmpty.svg'
                  : '/img/icons/CartCounter.svg'
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
            {/* Top bar: Logo + Close */}
            <div className={styles.mobileTop}>
              <NavLink
                to="/"
                replace
                className={styles.mobileLogo}
                onClick={() => setIsMenuOpen(false)}
              >
                <img src="/img/logo/Nice Gadgets.svg" alt="Logo" />
              </NavLink>

              <button
                className={styles.close}
                onClick={() => setIsMenuOpen(false)}
              >
                <img src="/img/icons/Close.svg" alt="Close" />
              </button>
            </div>

            {/* Centered navigation */}
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

            {/* Bottom actions */}
            <div className={styles.mobileActions}>
              <NavLink
                to="/favorites"
                className={styles.icon}
                onClick={() => setIsMenuOpen(false)}
              >
                <img
                  src={
                    favorites.length === 0
                      ? '/img/icons/FavoriteEmpty.svg'
                      : '/img/icons/FavoritesFilled.svg'
                  }
                  alt="Favorites"
                />

                {favorites.length > 0 && (
                  <span className={styles.counter}>{favorites.length}</span>
                )}
              </NavLink>

              <NavLink
                to="/cart"
                className={styles.icon}
                onClick={() => setIsMenuOpen(false)}
              >
                <img
                  src={
                    cartCount === 0
                      ? '/img/icons/CartEmpty.svg'
                      : '/img/icons/CartCount.svg'
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
