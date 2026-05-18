import { WithLoader } from '../../components/WithLoader';
// eslint-disable-next-line max-len
import { ProductsList } from '../CatalogPage/components/ProductsList';
import { useFavorites } from '../../shared/context/FavoritesContext';

export const FavoritesPage = () => {
  const { favorites } = useFavorites();

  return (
    <section className="favorites-page">
      <h1>My Favorites</h1>

      <WithLoader loading={false} error={undefined}>
        {favorites.length === 0 ? (
          <p>No favorites yet</p>
        ) : (
          <ProductsList products={favorites} />
        )}
      </WithLoader>
    </section>
  );
};
