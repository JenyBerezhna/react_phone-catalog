import { useRef } from 'react';
import { Product } from '../../../../types/Product';
import styles from '../../components/ProductsSlider/ProductsSlider.module.scss';

type Props = {
  title: string;
  products: Product[];
};

export const ProductsSlider: React.FC<Props> = ({ title, products }) => {
  const ref = useRef<HTMLDivElement>(null);

  const scroll = (offset: number) => {
    ref.current?.scrollBy({
      left: offset,
      behavior: 'smooth',
    });
  };

  return (
    <section>
      <h2>{title}</h2>

      <div className={styles.controls}>
        <button onClick={() => scroll(-300)}>‹</button>
        <button onClick={() => scroll(300)}>›</button>
      </div>

      <div className={styles.list} ref={ref}>
        {products.map(product => (
          <div key={product.id} className={styles.card}>
            <img src={`/${product.image}`} alt={product.name} />
            <p>{product.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
};
