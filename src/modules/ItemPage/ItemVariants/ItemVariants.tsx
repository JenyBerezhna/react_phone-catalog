import styles from './ItemVariants.module.scss';
import { ProductDetails } from '../../../types/ProductDetails';

interface ItemVariantsProps {
  product: ProductDetails;
  onColorChange: (color: string) => void;
  onCapacityChange: (capacity: string) => void;
}

export const ItemVariants: React.FC<ItemVariantsProps> = ({
  product,
  onColorChange,
  onCapacityChange,
}) => {
  const colors = product.colorsAvailable;
  const capacities = product.capacityAvailable;

  return (
    <div className={styles.wrapper}>
      {/* COLORS */}
      <div className={styles.section}>
        <h3>Available colors</h3>
        <div className={styles.options}>
          {colors.map((color: string) => (
            <button
              key={color}
              className={
                color === product.color ? styles.active : styles.option
              }
              onClick={() => onColorChange(color)}
            >
              {color}
            </button>
          ))}
        </div>
      </div>

      {/* CAPACITIES */}
      <div className={styles.section}>
        <h3>Available capacities</h3>
        <div className={styles.options}>
          {capacities.map((capacity: string) => (
            <button
              key={capacity}
              className={
                capacity === product.capacity ? styles.active : styles.option
              }
              onClick={() => onCapacityChange(capacity)}
            >
              {capacity}
            </button>
          ))}
        </div>
      </div>

      {/* PRICE */}
      <div className={styles.price}>
        <p>Regular price: £{product.priceRegular}</p>
        <p>Discount price: £{product.priceDiscount}</p>
      </div>
    </div>
  );
};
