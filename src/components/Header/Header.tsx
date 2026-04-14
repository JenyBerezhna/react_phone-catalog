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
        <NavLink
          to="/"
          replace
          className={styles.logo}
          aria-label="Go to homepage"
        >
          <img src="/public/img/logo/Logo.png" alt="Logo" />
        </NavLink>

        {/* Desktop/Tablet navigation */}
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

        {/* Desktop/Tablet actions */}
        <div className={styles.actionsDesktop}>
          <NavLink
            to="/favorites"
            className={styles.icon}
            aria-label="Favorites"
          >
            <img src="/img/icons/Favourites.png" alt="Favourites" />
            {favorites.length > 0 && (
              <span className={styles.counter}>{favorites.length}</span>
            )}
          </NavLink>

          <NavLink to="/cart" className={styles.icon} aria-label="Cart">
            <img src="/img/icons/Cart.png" alt="Shopping cart" />
            {cartCount > 0 && (
              <span className={styles.counter}>{cartCount}</span>
            )}
          </NavLink>
        </div>

        {/* Mobile burger */}
        <button
          className={styles.burger}
          aria-label="Open menu"
          onClick={() => setIsMenuOpen(true)}
        >
          <img src="/img/icons/Menu.png" alt="Menu" />
        </button>

        {/* Mobile menu overlay */}
        {isMenuOpen && (
          <div className={styles.mobileMenu}>
            <button
              className={styles.close}
              aria-label="Close menu"
              onClick={() => setIsMenuOpen(false)}
            >
              ✕
            </button>

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
          </div>
        )}
      </div>
    </header>
  );
};
