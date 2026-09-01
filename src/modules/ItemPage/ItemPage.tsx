import { useNavigate, useParams } from 'react-router-dom';

import styles from './ItemPage.module.scss';

import { ItemGallery } from './ItemGallery/ItemGallery';
import { ItemVariants } from './ItemVariants/ItemVariants';
import { ItemSpec } from './ItemSpec/ItemSpec';
import { ItemDescription } from './ItemDescription/ItemDescription';

import { BackButton } from '../../components/BackButton/BackButton';
import { WithLoader } from '../../components/WithLoader';

import { useItemDetails } from '../../hooks/useItemDetails';
import { useProducts } from '../../hooks/useProducts';
import { useSuggestedProducts } from '../../hooks/useSuggestedProducts';
import { getItemUrl } from '../../shared/helpers/getItemUrl';

import { Slider } from '../../components/Slider/Slider';
import { CardInfo } from '../../modules/Card/CardInfo/CardInfo';

import { useCart } from '../../shared/context/CartContext';
import { useFavorites } from '../../shared/context/FavoritesContext';
import { normalizeProduct } from '../../shared/context/normalizeProduct';

export const ItemPage: React.FC = () => {
  const { itemId } = useParams();
  const navigate = useNavigate();

  const { products: allProducts } = useProducts();
  const { items, addToCart } = useCart();
  const { favorites, toggleFavorite } = useFavorites();

  const currentItemId = itemId?.toLowerCase() || '';

  const listProduct = allProducts.find(
    p => p.itemId.toLowerCase() === currentItemId,
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

  if (loading || error || !product) {
    return (
      <WithLoader loading={loading} error={error ? String(error) : null}>
        <div className={styles.skeleton}>
          {loading ? 'Loading item...' : 'Unable to load item'}
        </div>
      </WithLoader>
    );
  }

  const normalized = normalizeProduct(product);

  const isInCart = items.some(item => item.id === normalized.id);
  const isFavorite = favorites.some(f => f.id === normalized.id);

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
        <ItemGallery images={product.images} />

        <div className={styles.rightColumn}>
          <div className={styles.variantsWrapper}>
            <ItemVariants
              product={product}
              onColorChange={handleColorChange}
              onCapacityChange={handleCapacityChange}
            />
          </div>

          <div className={styles.cardInfoWrapper}>
            <CardInfo
              product={normalized}
              showPrices
              showDiscount
              showSpecs
              showActions
              isInCart={isInCart}
              isFavorite={isFavorite}
              onAddToCart={() => addToCart(normalized)}
              onToggleFavorite={() => toggleFavorite(normalized)}
              showDivider={false}
              className={styles.cardInfoTransparent}
            />
          </div>
        </div>
      </div>

      <ItemDescription product={product} />
      <ItemSpec product={product} />

      {!loadingSuggested && suggested.length > 0 && (
        <Slider
          title="You may also like"
          products={suggested}
          showDiscount={false}
        />
      )}
    </section>
  );
};
