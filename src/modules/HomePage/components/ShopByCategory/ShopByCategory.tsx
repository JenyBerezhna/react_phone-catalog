import { Link } from 'react-router-dom';
import styles from './ShopByCategory.module.scss';

export const ShopByCategory = () => {
  return (
    <section className={styles.categories}>
      <h2 className={styles.title}>Shop by category</h2>

      <div className={styles.list}>
        <Link to="/phones" className={styles.item}>
          <img src="/img/category-phones.png" alt="Phones" />
          <span>Mobile phones</span>
        </Link>

        <Link to="/tablets" className={styles.item}>
          <img src="/img/category-tablets.png" alt="Tablets" />
          <span>Tablets</span>
        </Link>

        <Link to="/accessories" className={styles.item}>
          <img src="/img/category-accessories.png" alt="Accessories" />
          <span>Accessories</span>
        </Link>
      </div>
    </section>
  );
};
