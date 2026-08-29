import React from 'react';

import { Product } from '../../../types/Product';
import { ProductDetails } from '../../../types/ProductDetails';

import styles from './CardInfo.module.scss';

interface CardInfoProps {
  product: Product | ProductDetails;

  showPrices?: boolean;
  showDiscount?: boolean;
  showActions?: boolean;
  showSpecs?: boolean;

  isInCart?: boolean;
  isFavorite?: boolean;

  onAddToCart?: () => void;
  onToggleFavorite?: () => void;
}

export const CardInfo: React.FC<CardInfoProps> = ({
  product,
  showPrices = true,
  showDiscount = true,
  showActions = true,
  showSpecs = true,
  isInCart = false,
  isFavorite = false,
  onAddToCart,
  onToggleFavorite,
}) => {
  const isDetails = (
    item: Product | ProductDetails,
  ): item is ProductDetails => {
    return 'priceDiscount' in item;
  };

  const price = isDetails(product) ? product.priceDiscount : product.price;

  const fullPrice = isDetails(product)
    ? product.priceRegular
    : product.fullPrice;

  const hasDiscount = price < fullPrice;

  const showDivider = showPrices && (showActions || showSpecs);

  const handleAddToCart = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();

    onAddToCart?.();
  };

  const handleToggleFavorite = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();

    onToggleFavorite?.();
  };

  return (
    <div className={styles.info}>
      {showPrices && (
        <div className={styles.prices}>
          <span className={styles.priceCurrent}>${price}</span>

          {showDiscount && hasDiscount && (
            <span className={styles.priceFull}>${fullPrice}</span>
          )}
        </div>
      )}

      {showDivider && <div className={styles.divider} />}

      {showActions && (
        <div className={styles.actions}>
          <button
            type="button"
            className={styles.addButton}
            disabled={isInCart}
            onClick={handleAddToCart}
          >
            {isInCart ? 'Added to cart' : 'Add to cart'}
          </button>

          <button
            type="button"
            className={styles.heart}
            onClick={handleToggleFavorite}
            aria-label={
              isFavorite ? 'Remove from favorites' : 'Add to favorites'
            }
          >
            <img
              src={
                isFavorite
                  ? '/img/icons/FavoriteFilled.svg'
                  : '/img/icons/FavoriteEmpty.svg'
              }
              alt=""
            />
          </button>
        </div>
      )}

      {showSpecs && (
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
      )}
    </div>
  );
};
