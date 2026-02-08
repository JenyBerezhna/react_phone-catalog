import { useFavoritesContext } from '../shared/context/FavoritesContext';

export const useFavorites = () => {
  const { favorites, toggleFavorite } = useFavoritesContext();

  return {
    favorites,
    toggleFavorite,
    loading: false,
    error: null,
  };
};
