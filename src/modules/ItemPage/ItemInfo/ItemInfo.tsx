import styles from './ItemInfo.module.scss';
import { ItemOptions } from '../ItemInfo/ItemOptions/ItemOptions';
import type { ProductDetails } from '../../../types/ProductDetails';

interface ItemInfoProps {
  product: ProductDetails;
  selectedColor: string;
  selectedCapacity: string;
  onColorChange: (color: string) => void;
  onCapacityChange: (capacity: string) => void;
}

export const ItemInfo = ({
  product,
  selectedColor,
  selectedCapacity,
  onColorChange,
  onCapacityChange,
}: ItemInfoProps) => {
  return (
    <div className={styles.info}>
      {/* PRICE */}
      <div className={styles.priceBlock}>
        <span className={styles.price}>${product.priceDiscount}</span>
        <span className={styles.fullPrice}>${product.priceRegular}</span>
      </div>

      {/* OPTIONS */}
      <ItemOptions
        colors={product.colorsAvailable}
        capacities={product.capacityAvailable}
        selectedColor={selectedColor}
        selectedCapacity={selectedCapacity}
        onColorChange={onColorChange}
        onCapacityChange={onCapacityChange}
      />

      {/* SHORT SPECS */}
      <div className={styles.shortSpecs}>
        <div className={styles.specRow}>
          <span>Screen</span>
          <span>{product.screen}</span>
        </div>

        <div className={styles.specRow}>
          <span>Resolution</span>
          <span>{product.resolution}</span>
        </div>

        <div className={styles.specRow}>
          <span>Processor</span>
          <span>{product.processor}</span>
        </div>

        <div className={styles.specRow}>
          <span>RAM</span>
          <span>{product.ram}</span>
        </div>
      </div>

      {/* BUTTON */}
      <button className={styles.addToCart}>Add to cart</button>
    </div>
  );
};
