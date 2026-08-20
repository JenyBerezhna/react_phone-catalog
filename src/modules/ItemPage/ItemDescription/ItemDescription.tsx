import styles from './ItemDescription.module.scss';
import type { ProductDetails } from '../../../types/ProductDetails';

interface ItemDescriptionProps {
  product: ProductDetails;
}

export const ItemDescription: React.FC<ItemDescriptionProps> = ({
  product,
}) => {
  const about = product.description?.[0] ?? { title: 'About', text: [] };
  const camera = product.description?.[1] ?? { title: 'Camera', text: [] };

  return (
    <div className={styles.description}>
      {/* ABOUT */}
      <div className={styles.block}>
        <h3 className={styles.title}>{about.title}</h3>

        {about.text.length > 0 ? (
          about.text.map((p, i) => (
            <p key={i} className={styles.paragraph}>
              {p}
            </p>
          ))
        ) : (
          <p className={styles.paragraph}>No information available.</p>
        )}
      </div>

      {/* CAMERA */}
      <div className={styles.block}>
        <h3 className={styles.title}>{camera.title}</h3>

        {camera.text.length > 0 ? (
          camera.text.map((p, i) => (
            <p key={i} className={styles.paragraph}>
              {p}
            </p>
          ))
        ) : (
          <p className={styles.paragraph}>No camera information available.</p>
        )}
      </div>

      {/* FULL TECH SPECS */}
      <div className={styles.block}>
        <h3 className={styles.title}>Tech specs</h3>

        <div className={styles.specs}>
          <div className={styles.specRow}>
            <span>Screen</span>
            <span>{product.screen ?? 'N/A'}</span>
          </div>

          <div className={styles.specRow}>
            <span>Resolution</span>
            <span>{product.resolution ?? 'N/A'}</span>
          </div>

          <div className={styles.specRow}>
            <span>Processor</span>
            <span>{product.processor ?? 'N/A'}</span>
          </div>

          <div className={styles.specRow}>
            <span>RAM</span>
            <span>{product.ram ?? 'N/A'}</span>
          </div>

          <div className={styles.specRow}>
            <span>Built-in memory</span>
            <span>
              {Array.isArray(product.capacity)
                ? product.capacity.join(', ')
                : product.capacity}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
