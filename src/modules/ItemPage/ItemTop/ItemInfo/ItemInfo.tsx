import React from 'react';
import styles from './ItemInfo.module.scss';

import { ItemVariants } from './ItemVariants/ItemVariants';
import { CardInfo } from '../../../Card/CardInfo/CardInfo';
import { ProductDetails } from '../../../../types/ProductDetails';
import { Product } from '../../../../types/Product';

type Props = {
  product: ProductDetails;
  normalized: Product;
  isInCart: boolean;
  isFavorite: boolean;
  onColorChange: (color: string) => void;
  onCapacityChange: (capacity: string) => void;
  onAddToCart: () => void;
  onToggleFavorite: () => void;
};

export const ItemInfo: React.FC<Props> = ({
  product,
  normalized,
  isInCart,
  isFavorite,
  onColorChange,
  onCapacityChange,
  onAddToCart,
  onToggleFavorite,
}) => {
  return (
    <div className={styles.rightColumn}>
      <div className={styles.variantsWrapper}>
        <ItemVariants
          product={product}
          onColorChange={onColorChange}
          onCapacityChange={onCapacityChange}
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
          onAddToCart={onAddToCart}
          onToggleFavorite={onToggleFavorite}
          showDivider={false}
          className={styles.cardInfoTransparent}
        />
      </div>
    </div>
  );
};
