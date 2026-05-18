import { useRef } from 'react';
import { Product } from '../../../../types/Product';
import styles from './ProductsSlider.module.scss';
import { ProductCard } from '../../components/ProductCard/ProductCard';

type Props = {
  title: string;
  products: Product[];
  showDiscount: boolean;
};

export const ProductsSlider: React.FC<Props> = ({
  title,
  products,
  showDiscount,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (!ref.current) {
      return;
    }

    const firstCard = ref.current.querySelector(
      `.${styles.cardWrapper}`,
    ) as HTMLElement;

    if (!firstCard) {
      return;
    }

    const cardWidth = firstCard.offsetWidth + 16; // gap = 16px
    const offset = direction === 'left' ? -cardWidth : cardWidth;

    ref.current.scrollBy({ left: offset, behavior: 'smooth' });
  };

  return (
    <section className={styles.slider}>
      {/* Header with title + rectangular arrows */}
      <div className={styles.header}>
        <h2 className={styles.title}>{title}</h2>

        <div className={styles.controls}>
          <button
            className={styles.arrow}
            onClick={() => scroll('left')}
            aria-label="Previous products"
          >
            <img src="/img/icons/arrowLeft.png" alt="Previous" />
          </button>

          <button
            className={styles.arrow}
            onClick={() => scroll('right')}
            aria-label="Next products"
          >
            <img src="/img/icons/arrowRight.png" alt="Next" />
          </button>
        </div>
      </div>

      {/* Horizontal scroll list */}
      <div className={styles.list} ref={ref}>
        {products.map(product => (
          <div key={product.id} className={styles.cardWrapper}>
            <ProductCard product={product} showDiscount={showDiscount} />
          </div>
        ))}
      </div>
    </section>
  );
};
