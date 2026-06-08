import { CategoryCard } from '../CategoryCard/CategoryCard';
import { useProducts } from '../../../../hooks/useProducts';
import styles from './ShopByCategory.module.scss';

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
        <CategoryCard
          title="Mobile phones"
          image="/img/PhonesCategory.svg"
          link="/phones"
          models={phonesCount}
        />

        <CategoryCard
          title="Tablets"
          image="/img/TabsCategory.svg"
          link="/tablets"
          models={tabletsCount}
        />

        <CategoryCard
          title="Accessories"
          image="/img/AccessoriseCategory.svg"
          link="/accessories"
          models={accessoriesCount}
        />
      </div>
    </section>
  );
};
