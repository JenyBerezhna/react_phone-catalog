import styles from './ProductsList.module.scss';
import { Product } from '../../../../types/Product';
type Props = {
  products: Product[];
};

export const ProductsList: React.FC<Props> = ({ products }) => {
  return (
    <div className={styles.list}>
      {products.map(product => (
        <div key={product.id} className={styles.card}>
          <img
            src={`/img/${product.category}/${product.itemId}.png`}
            alt={product.name}
          />
          <h3>{product.name}</h3>
          <p>${product.price}</p>
        </div>
      ))}
    </div>
  );
};
