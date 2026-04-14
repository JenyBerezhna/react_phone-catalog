import styles from './HomePage.module.scss';

import { Hero } from './components/Hero/Hero';
import { ProductsSlider } from './components/ProductsSlider/ProductsSlider';
import { CategoryCard } from '../../components/CategoryCard/CategoryCard';

import { useProducts } from '../../hooks/useProducts';
import { WithLoader } from '../../components/WithLoader';

import { getModels } from '../../shared/helpers/getModels';

export const HomePage = () => {
  const { products, loading, error } = useProducts();

  const models = getModels(products);

  const brandNewModels = [...models].sort((a, b) => b.year! - a.year!);

  const hotPrices = [...models].sort(
    (a, b) => a.priceDiscount - b.priceDiscount,
  );

  return (
    <WithLoader loading={loading} error={error}>
      <>
        <h1 className={styles.visuallyHidden}>Product Catalog</h1>

        <section className={styles.section}>
          <Hero />
        </section>

        <section className={styles.section}>
          <ProductsSlider
            title="Brand new models"
            products={brandNewModels}
            showDiscount={false}
          />
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Shop by category</h2>

          <div className={styles.categories}>
            <CategoryCard
              title="Mobile phones"
              image="/img/category/category-phones.png"
              link="/phones"
            />

            <CategoryCard
              title="Tablets"
              image="/img/category/category-tablets.png"
              link="/tablets"
            />

            <CategoryCard
              title="Accessories"
              image="/img/category/category-accessories.png"
              link="/accessories"
            />
          </div>
        </section>

        <section className={styles.section}>
          <ProductsSlider
            title="Hot prices"
            products={hotPrices}
            showDiscount={true}
          />
        </section>
      </>
    </WithLoader>
  );
};
