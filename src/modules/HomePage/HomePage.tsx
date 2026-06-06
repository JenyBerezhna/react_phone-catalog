/* eslint-disable max-len */
import styles from './HomePage.module.scss';

import { Hero } from './components/Hero/Hero';
import { ProductsSlider } from './components/ProductCardSlider/ProductCardSlider';
import { CategoryCard } from '../../components/CategoryCard/CategoryCard';

import { useProducts } from '../../hooks/useProducts';
import { WithLoader } from '../../components/WithLoader';

export const HomePage = () => {
  const { products, loading, error } = useProducts();
  const phonesCount = products.filter(p => p.category === 'phones').length;
  const tabletsCount = products.filter(p => p.category === 'tablets').length;
  const accessoriesCount = products.filter(
    p => p.category === 'accessories',
  ).length;

  const brandNew = [...products].sort((a, b) => b.year - a.year);

  const hotPrices = [...products].sort((a, b) => {
    const discountA = a.fullPrice - a.price;
    const discountB = b.fullPrice - b.price;

    return discountB - discountA;
  });

  return (
    <WithLoader loading={loading} error={error}>
      <>
        <h1 className={styles.visuallyHidden}>Product Catalog</h1>

        {/* Page title */}
        <h2 className={styles.pageTitle}>Welcome to Nice Gadgets store!</h2>

        {/* Hero section */}
        <section className={styles.section}>
          <Hero />
        </section>

        {/* Brand new models */}
        <section className={styles.section}>
          <ProductsSlider
            title="Brand new models"
            products={brandNew}
            showDiscount={false}
          />
        </section>

        <section className={styles.section}>
          <div className={styles.container}>
            <h2 className={styles.sectionTitle}>Shop by category</h2>

            <div className={styles.categories}>
              <CategoryCard
                title="Mobile phones"
                image="/img/category/category-phones.png"
                link="/phones"
                models={phonesCount}
              />

              <CategoryCard
                title="Tablets"
                image="/img/category/category-tablets.png"
                link="/tablets"
                models={tabletsCount}
              />

              <CategoryCard
                title="Accessories"
                image="/img/category/category-accessories.png"
                link="/accessories"
                models={accessoriesCount}
              />
            </div>
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
