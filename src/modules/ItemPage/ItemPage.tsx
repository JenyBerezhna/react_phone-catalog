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

export const ItemPage: React.FC = () => {
  const { itemId } = useParams();
  const navigate = useNavigate();

  const { products: allProducts } = useProducts();
  const { items, addToCart } = useCart();
  const { favorites, toggleFavorite } = useFavorites();

  const listProduct = allProducts.find(p => p.itemId === itemId);

  const { product, loading, error } = useItemDetails(
    itemId || '',
    listProduct?.category || '',
  );

  const { suggested, loadingSuggested } = useSuggestedProducts(
    product,
    allProducts,
  );

  if (loading) {
    return (
      <WithLoader loading={true} error={null}>
        <div className={styles.skeleton}>Loading item...</div>
      </WithLoader>
    );
  }

  if (error || !product) {
    return (
      <WithLoader loading={false} error={error ? String(error) : null}>
        <div className={styles.skeleton}>Unable to load item</div>
      </WithLoader>
    );
  }

  const isInCart = items.some(item => item.id === product.id);
  const isFavorite = favorites.some(fav => fav.id === product.id);

  return (
    <section className={styles.page}>
      <BackButton className={styles.back} />

      <h1 className={styles.title}>{product.name}</h1>

      <div className={styles.productGrid}>
        <ItemGallery images={product.images} />

        <ItemVariants
          product={product}
          onColorChange={newColor =>
            navigate(
              getItemUrl(product.namespaceId, product.capacity, newColor),
            )
          }
          onCapacityChange={newCapacity =>
            navigate(
              getItemUrl(product.namespaceId, newCapacity, product.color),
            )
          }
        />
      </div>

      {/* ⭐ Reusable Info Block */}
      <div className={styles.priceSection}>
        <CardInfo
          product={product}
          showPrices
          showDiscount
          showSpecs
          showActions
          isInCart={isInCart}
          isFavorite={isFavorite}
          onAddToCart={() => addToCart(product)}
          onToggleFavorite={() => toggleFavorite(product)}
        />
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
