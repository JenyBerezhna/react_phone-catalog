import { WithLoader } from '../../components/WithLoader';
import { ProductCard } from '../HomePage/components/ProductCard';
import styles from './FavoritesPage.module.scss';
import { useFavorites } from '../../shared/context/FavoritesContext';

export const FavoritesPage = () => {
  const { favorites } = useFavorites();

  return (
    <section className="favorites-page">
      <h1>Favourites</h1>
      <p className={styles.counter}>{favorites.length} items</p>

      <WithLoader loading={false} error={undefined}>
        {favorites.length === 0 ? (
          <p>No favourites yet</p>
        ) : (
          <div className={styles.favoritesGrid}>
            {favorites.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                showDiscount={false}
              />
            ))}
          </div>
        )}
      </WithLoader>
    </section>
  );
};
