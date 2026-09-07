import { useNavigate, useParams } from 'react-router-dom';

import styles from './ItemPage.module.scss';

import { ItemGallery } from './ItemTop/ItemGallery/ItemGallery';
import { ItemInfo } from './ItemTop/ItemInfo/ItemInfo';
import { ItemDescription } from './ItemDetails/ItemDescription/ItemDescription';
import { ItemSpec } from './ItemDetails/ItemSpec/ItemSpec';
import { SuggestedProducts } from './SuggestedProducts';

import { BackButton } from '../../components/BackButton/BackButton';
import { WithLoader } from '../../components/WithLoader';

import { useItemDetails } from '../../hooks/useItemDetails';
import { useProducts } from '../../hooks/useProducts';
import { useSuggestedProducts } from '../../hooks/useSuggestedProducts';

import { getItemUrl } from '../../shared/helpers/getItemUrl';
import { normalizeProduct } from '../../shared/context/normalizeProduct';

import { useCart } from '../../shared/context/CartContext';
import { useFavorites } from '../../shared/context/FavoritesContext';

export const ItemPage: React.FC = () => {
  const { itemId } = useParams();
  const navigate = useNavigate();

  const { products: allProducts } = useProducts();
  const { items, addToCart } = useCart();
  const { favorites, toggleFavorite } = useFavorites();

  const currentItemId = itemId?.toLowerCase() || '';

  const listProduct = allProducts.find(
    product => product.itemId.toLowerCase() === currentItemId,
  );

  const { product, loading, error } = useItemDetails(
    currentItemId,
    listProduct?.category ?? '',
  );

  const { suggested, loadingSuggested } = useSuggestedProducts(
    product,
    allProducts,
  );

  if (!itemId) {
    return <div className={styles.skeleton}>Invalid URL</div>;
  }

  if (!product && loading) {
    return (
      <WithLoader loading={true} error={null}>
        <div className={styles.skeleton}>Loading item...</div>
      </WithLoader>
    );
  }

  if (!product && error) {
    return (
      <WithLoader loading={false} error={error}>
        <div className={styles.skeleton}>Unable to load item</div>
      </WithLoader>
    );
  }

  if (!product) {
    return null;
  }

  const normalized = normalizeProduct(product);

  const isInCart = items.some(item => item.id === normalized.id);

  const isFavorite = favorites.some(favorite => favorite.id === normalized.id);

  const handleColorChange = (newColor: string) => {
    navigate(getItemUrl(product.namespaceId, product.capacity, newColor));
  };

  const handleCapacityChange = (newCapacity: string) => {
    navigate(getItemUrl(product.namespaceId, newCapacity, product.color));
  };

  return (
    <section className={styles.page}>
      <BackButton className={styles.back} />

      <h1 className={styles.title}>{product.name}</h1>

      <div className={styles.productGrid}>
        <div className={styles.gallery}>
          <ItemGallery images={product.images} />
        </div>

        <div className={styles.info}>
          <ItemInfo
            product={product}
            normalized={normalized}
            isInCart={isInCart}
            isFavorite={isFavorite}
            onColorChange={handleColorChange}
            onCapacityChange={handleCapacityChange}
            onAddToCart={() => addToCart(normalized)}
            onToggleFavorite={() => toggleFavorite(normalized)}
          />
        </div>

        <div className={styles.description}>
          <ItemDescription product={product} />
        </div>

        <div className={styles.spec}>
          <ItemSpec product={product} />
        </div>
      </div>

      {!loadingSuggested && suggested.length > 0 && (
        <SuggestedProducts products={suggested} />
      )}
    </section>
  );
};
