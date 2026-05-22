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
    const container = ref.current;

    if (!container) {
      return;
    }

    const firstCard = container.querySelector(
      `.${styles.cardWrapper}`,
    ) as HTMLElement | null;

    if (!firstCard) {
      return;
    }

    const cardWidth = firstCard.getBoundingClientRect().width;
    const gap = 16;
    const offset = direction === 'left' ? -(cardWidth + gap) : cardWidth + gap;

    container.scrollBy({
      left: offset,
      behavior: 'smooth',
    });
  };

  return (
    <section className={styles.slider}>
      <div className={styles.header}>
        <h2 className={styles.title}>{title}</h2>

        <div className={styles.controls}>
          <button
            className={styles.arrow}
            onClick={() => scroll('left')}
            aria-label="Previous products"
          >
            <img src="/img/icons/ArrowLeft.svg" alt="Previous" />
          </button>

          <button
            className={styles.arrow}
            onClick={() => scroll('right')}
            aria-label="Next products"
          >
            <img src="/img/icons/ArrowRight.svg" alt="Next" />
          </button>
        </div>
      </div>

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
