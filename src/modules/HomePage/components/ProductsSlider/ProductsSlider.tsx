import { useRef } from 'react';
import { Product } from '../../../../types/Product';
import styles from './ProductsSlider.module.scss';
import { Card } from '../../../Card/Card';

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

    const card = container.querySelector('.card--slider') as HTMLElement | null;

    if (!card) {
      return;
    }

    const cardWidth = card.getBoundingClientRect().width;
    const gap = 16;
    const offset = direction === 'left' ? -(cardWidth + gap) : cardWidth + gap;

    container.scrollBy({ left: offset, behavior: 'smooth' });
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

      {/* LAYOUT SYSTEM */}
      <div className="layout--slider" ref={ref}>
        {products.map(product => (
          <Card
            key={product.id}
            product={product}
            variant="slider"
            showPrices
            showSpecs
            showActions
            showDiscount={showDiscount}
          />
        ))}
      </div>
    </section>
  );
};
