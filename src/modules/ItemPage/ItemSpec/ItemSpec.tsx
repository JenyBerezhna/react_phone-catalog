import styles from './ItemSpec.module.scss';
import type { ProductDetails } from '../../../types/ProductDetails';

interface ItemSpecProps {
  product: ProductDetails;
}

export const ItemSpec: React.FC<ItemSpecProps> = ({ product }) => {
  return (
    <div className={styles.specs}>
      <h2 className={styles.title}>Tech specs</h2>

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

      <div className={styles.specRow}>
        <span>Built-in memory</span>
        <span>{product.capacity?.join(', ')}</span>
      </div>
    </div>
  );
};
