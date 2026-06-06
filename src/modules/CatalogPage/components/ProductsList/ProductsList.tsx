import styles from './ProductsList.module.scss';
import { Product } from '../../../../types/Product';
import { Card } from '../../../Card/Card';

type Props = {
  products: Product[];
  className?: string;
};

export const ProductsList: React.FC<Props> = ({ products, className }) => {
  return (
    <div className={className ?? styles.list}>
      {products.map(product => (
        <Card
          key={product.id}
          product={product}
          variant="catalog"
          showPrices
          showSpecs
          showActions
          showDiscount
        />
      ))}
    </div>
  );
};
