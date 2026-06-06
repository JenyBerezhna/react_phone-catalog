import React from 'react';
import classNames from 'classnames';

import { useCart } from '../../shared/context/CartContext';
import { useFavorites } from '../../shared/context/FavoritesContext';

import FavoriteFilled from '/img/icons/FavoriteFilled.svg';
import FavoriteEmpty from '/img/icons/FavoriteEmpty.svg';

import styles from './Card.module.scss';
import { Product } from '../../types/Product';

type CardVariant = 'catalog' | 'category' | 'slider' | 'favorite';

type Props = {
  product: Product;
  variant?: CardVariant;

  showPrices?: boolean;
  showSpecs?: boolean;
  showActions?: boolean;
  showDiscount?: boolean;
};

export const Card: React.FC<Props> = ({
  product,
  variant = 'catalog',
  showPrices = true,
  showSpecs = true,
  showActions = true,
  showDiscount = true,
}) => {
  const { items, addToCart } = useCart();
  const { favorites, toggleFavorite } = useFavorites();

  const isInCart = items.some(item => item.id === product.id);
  const isFavorite = favorites.some(fav => fav.id === product.id);

  const hasDiscount = product.fullPrice > product.price;

  return (
    <div className={classNames(styles.card, styles[`card--${variant}`])}>
      {/* IMAGE */}
      <div className={styles.card__imageWrapper}>
        <img
          src={product.image}
          alt={product.name}
          className={styles.card__image}
        />
      </div>

      {/* NAME */}
      <h3 className={styles.card__name}>{product.name}</h3>

      {/* PRICES */}
      {showPrices && (
        <div className={styles.card__prices}>
          <span className={styles.card__priceCurrent}>${product.price}</span>

          {showDiscount && hasDiscount && (
            <span className={styles.card__priceFull}>${product.fullPrice}</span>
          )}
        </div>
      )}

      {/* DIVIDER */}
      {(showPrices || showSpecs) && <div className={styles.card__divider} />}

      {/* ACTIONS */}
      {showActions && (
        <div className={styles.card__actions}>
          <button
            disabled={isInCart}
            onClick={() => addToCart(product)}
            className={styles.card__addButton}
          >
            {isInCart ? 'Added to cart' : 'Add to cart'}
          </button>

          <button
            className={styles.card__heart}
            onClick={() => toggleFavorite(product)}
          >
            <img
              src={isFavorite ? FavoriteFilled : FavoriteEmpty}
              alt="Favorite"
            />
          </button>
        </div>
      )}

      {/* SPECS */}
      {showSpecs && (
        <div className={styles.card__specs}>
          <div className={styles.card__specRow}>
            <span>Screen</span>
            <span className={styles.card__specValue}>{product.screen}</span>
          </div>

          <div className={styles.card__specRow}>
            <span>Capacity</span>
            <span className={styles.card__specValue}>{product.capacity}</span>
          </div>

          <div className={styles.card__specRow}>
            <span>RAM</span>
            <span className={styles.card__specValue}>{product.ram}</span>
          </div>
        </div>
      )}
    </div>
  );
};
