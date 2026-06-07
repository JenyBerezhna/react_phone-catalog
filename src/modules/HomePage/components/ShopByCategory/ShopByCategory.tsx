import { Link } from 'react-router-dom';
import styles from './ShopByCategory.module.scss';
import { useProducts } from '../../../../hooks/useProducts';

export const ShopByCategory = () => {
  const { products } = useProducts();

  const phonesCount = products.filter(p => p.category === 'phones').length;
  const tabletsCount = products.filter(p => p.category === 'tablets').length;
  const accessoriesCount = products.filter(
    p => p.category === 'accessories',
  ).length;

  return (
    <section className={styles.categories}>
      <h2 className={styles.title}>Shop by category</h2>

      <div className={styles.grid}>
        <Link to="/phones" className={styles.card}>
          <div className={styles.imageWrapper}>
            <img src="/img/PhonesCategory.svg" alt="Phones" />
          </div>
          <h3 className={styles.cardTitle}>Mobile phones</h3>
          <p className={styles.cardSubtitle}>{phonesCount} models</p>
        </Link>

        <Link to="/tablets" className={styles.card}>
          <div className={styles.imageWrapper}>
            <img src="/img/TabletsCategory.svg" alt="Tablets" />
          </div>
          <h3 className={styles.cardTitle}>Tablets</h3>
          <p className={styles.cardSubtitle}>{tabletsCount} models</p>
        </Link>

        <Link to="/accessories" className={styles.card}>
          <div className={styles.imageWrapper}>
            <img src="/img/AccessoriseCategory.svg" alt="Accessories" />
          </div>
          <h3 className={styles.cardTitle}>Accessories</h3>
          <p className={styles.cardSubtitle}>{accessoriesCount} models</p>
        </Link>
      </div>
    </section>
  );
};
