import { WithLoader } from '../../components/WithLoader';
import styles from './FavoritesPage.module.scss';
import { useFavorites } from '../../shared/context/FavoritesContext';
import { Card } from '../../modules/Card/Card';

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
              <Card
                key={product.id}
                product={product}
                variant="favorite"
                showPrices
                showSpecs
                showActions={false}
                showDiscount
              />
            ))}
          </div>
        )}
      </WithLoader>
    </section>
  );
};
