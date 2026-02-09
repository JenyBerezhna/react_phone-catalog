// eslint-disable-next-line max-len
import { ProductsList } from '../../../ProductPage/components/ProductList';
import styles from './SuggestedProducts.module.scss';

type Props = {
  products: { id: string; name: string; price: number; imageUrl: string }[];
};

export const SuggestedProducts: React.FC<Props> = ({ products }) => {
  return (
    <section className={styles.suggested}>
      <h2 className={styles.title}>You may also like</h2>

      <ProductsList
        products={products.map(product => ({
          ...product,
          category: 'phones',
          fullPrice: product.price,
          year: new Date().getFullYear(),
          itemId: product.id,
        }))}
      />
    </section>
  );
};
