import { WithLoader } from '../../components/WithLoader';
// eslint-disable-next-line max-len
import { ProductsList } from '../ProductPage/components/ProductsList';
import { useFavorites } from '../../hooks/useFavorites';

export const FavoritesPage = () => {
  const { favorites, loading, error } = useFavorites();

  return (
    <section className="favorites-page">
      <h1>My Favorites</h1>

      <WithLoader loading={!!loading} error={error ?? undefined}>
        {favorites.length === 0 ? (
          <p>No favorites yet</p>
        ) : (
          <ProductsList products={favorites} />
        )}
      </WithLoader>
    </section>
  );
};
