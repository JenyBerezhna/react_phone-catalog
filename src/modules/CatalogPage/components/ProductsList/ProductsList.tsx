import styles from './ProductsList.module.scss';
import { Product } from '../../../../types/Product';

type Props = {
  products: Product[];
  className?: string;
};

export const ProductsList: React.FC<Props> = ({ products, className }) => {
  return (
    <div className={className ?? styles.list}>
      {products.map(product => {
        const hasDiscount = product.price < product.fullPrice;

        return (
          <div key={product.id} className={styles.card}>
            {/* Image */}
            <img
              src={product.image}
              alt={product.name}
              className={styles.image}
            />

            {/* Name */}
            <h3 className={styles.name}>{product.name}</h3>

            {/* Prices */}
            <div className={styles.prices}>
              <span className={styles.priceDiscount}>${product.price}</span>

              {hasDiscount && (
                <span className={styles.priceFull}>${product.fullPrice}</span>
              )}
            </div>

            {/* Divider */}
            <div className={styles.divider} />

            {/* Specs */}
            <div className={styles.specs}>
              <div>
                <span className={styles.specLabel}>Screen</span>
                <span className={styles.specValue}>{product.namespaceId}</span>
              </div>

              <div>
                <span className={styles.specLabel}>ID</span>
                <span className={styles.specValue}>{product.itemId}</span>
              </div>

              <div>
                <span className={styles.specLabel}>Year</span>
                <span className={styles.specValue}>{product.year}</span>
              </div>
            </div>

            {/* Buttons */}
            <div className={styles.actions}>
              <button className={styles.addToCart}>Add to cart</button>
              <button className={styles.favButton}>♡</button>
            </div>
          </div>
        );
      })}
    </div>
  );
};
