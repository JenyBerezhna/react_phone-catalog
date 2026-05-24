import { useCart } from '../../../../shared/context/CartContext';
import { useFavorites } from '../../../../shared/context/FavoritesContext';
import { Product } from '../../../../types/Product';
import styles from './ProductCard.module.scss';
import FavoriteFilled from '/img/icons/FavoriteFilled.svg';
import FavoriteEmpty from '/img/icons/FavoriteEmpty.svg';

type Props = {
  product: Product;
  showDiscount: boolean;
};

export const ProductCard: React.FC<Props> = ({ product, showDiscount }) => {
  const { items, addToCart } = useCart();
  const { favorites, toggleFavorite } = useFavorites();

  const isInCart = items.some(item => item.product.id === product.id);
  const isFavorite = favorites.some(item => item.id === product.id);

  const { price, fullPrice } = product;
  const hasDiscount = fullPrice > price;

  const handleAddToCart = () => {
    if (!isInCart) {
      addToCart(product);
    }
  };

  return (
    <div className={styles.card}>
      {/* IMAGE */}
      <div className={styles.imageWrapper}>
        <img src={product.image} alt={product.name} className={styles.image} />
      </div>

      {/* NAME */}
      <h3 className={styles.name}>{product.name}</h3>

      {/* PRICES */}
      <div className={styles.prices}>
        <span className={styles.priceCurrent}>${price}</span>

        {showDiscount && hasDiscount && (
          <span className={styles.priceFull}>${fullPrice}</span>
        )}
      </div>

      <div className={styles.divider} />

      {/* ACTION ROW: ADD TO CART + HEART */}
      <div className={styles.actionsRow}>
        <button
          disabled={isInCart}
          onClick={handleAddToCart}
          className={styles.addButton}
        >
          {isInCart ? 'Added to cart' : 'Add to cart'}
        </button>

        <button
          className={styles.heartButton}
          onClick={() => toggleFavorite(product)}
        >
          <img
            src={isFavorite ? FavoriteFilled : FavoriteEmpty}
            alt="Favorite"
          />
        </button>
      </div>

      {/* SPECS */}
      <div className={styles.specs}>
        <div className={styles.specRow}>
          <span>Screen</span>
          <span className={styles.specValue}>{product.screen}</span>
        </div>

        <div className={styles.specRow}>
          <span>Capacity</span>
          <span className={styles.specValue}>{product.capacity}</span>
        </div>

        <div className={styles.specRow}>
          <span>RAM</span>
          <span className={styles.specValue}>{product.ram}</span>
        </div>
      </div>
    </div>
  );
};
