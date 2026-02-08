import styles from './HomePage.module.scss';

import { Hero } from './components/Hero/Hero';
// eslint-disable-next-line max-len
import { ProductsSlider } from '../HomePage/components/ProductsSlider/ProductsSlider';
import { CategoryCard } from '../../components/CategoryCard/CategoryCard';

import { useProducts } from '../../hooks/useProducts';
import { WithLoader } from '../../components/WithLoader';

export const HomePage = () => {
  const { products, loading, error } = useProducts();

  const hotPrices = [...products]
    .filter(product => product.fullPrice && product.price)
    .sort((a, b) => b.fullPrice - b.price - (a.fullPrice - a.price));

  const brandNew = [...products].sort((a, b) => b.year - a.year);

  return (
    <WithLoader loading={loading} error={error}>
      <>
        <h1 className={styles.visuallyHidden}>Product Catalog</h1>

        <section className={styles.section}>
          <Hero />
        </section>

        <section className={styles.section}>
          <ProductsSlider title="Hot prices" products={hotPrices} />
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Shop by category</h2>

          <div className={styles.categories}>
            <CategoryCard
              title="Mobile phones"
              image="/img/category-phones.png"
              link="/phones"
            />

            <CategoryCard
              title="Tablets"
              image="/img/category-tablets.png"
              link="/tablets"
            />

            <CategoryCard
              title="Accessories"
              image="/img/category-accessories.png"
              link="/accessories"
            />
          </div>
        </section>

        <section className={styles.section}>
          <ProductsSlider title="Brand new models" products={brandNew} />
        </section>
      </>
    </WithLoader>
  );
};
