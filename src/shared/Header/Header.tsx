import { NavLink } from 'react-router-dom';
import { useAppContext } from '../../shared/context/AppContext';
import styles from './Header.module.scss';

const getNavClass = ({ isActive }: { isActive: boolean }) =>
  isActive ? `${styles.link} ${styles.active}` : styles.link;

export const Header = () => {
  const { favorites, cart } = useAppContext();

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
          <img src="/img/logo.svg" alt="Product Catalog" />
        </NavLink>

        <nav className={styles.nav}>
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

        <div className={styles.actions}>
          <NavLink
            to="/favorites"
            className={styles.icon}
            aria-label="Favorites"
          >
            <img src="/img/icons/favorites.svg" alt="" />

            {favorites.length > 0 && (
              <span className={styles.counter}>{favorites.length}</span>
            )}
          </NavLink>

          <NavLink to="/cart" className={styles.icon} aria-label="Cart">
            <img src="/img/icons/cart.svg" alt="" />

            {cartCount > 0 && (
              <span className={styles.counter}>{cartCount}</span>
            )}
          </NavLink>
        </div>
      </div>
    </header>
  );
};
