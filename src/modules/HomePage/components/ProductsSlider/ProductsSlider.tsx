import { useRef } from 'react';
import { Product } from '../../../../types/Product';
import styles from './ProductsSlider.module.scss';
import { ArrowLeft, ArrowRight } from '../../../../Arrows_Icon/Arrows';

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

    const card = ref.current.querySelector(`.${styles.card}`) as HTMLElement;

    if (!card) {
      return;
    }

    const cardWidth = card.offsetWidth + 16;
    const offset = direction === 'left' ? -cardWidth : cardWidth;

    ref.current.scrollBy({ left: offset, behavior: 'smooth' });
  };

  return (
    <section className={styles.slider}>
      <div className={styles.header}>
        <h2 className={styles.pageTitle}>{title}</h2>

        <div className={styles.controls}>
          <button className={styles.arrow} onClick={() => scroll('left')}>
            <ArrowLeft />
          </button>

          <button className={styles.arrow} onClick={() => scroll('right')}>
            <ArrowRight />
          </button>
        </div>
      </div>

      <div className={styles.list} ref={ref}>
        {products.map(product => {
          const hasDiscount = product.price < product.fullPrice;

          return (
            <div key={product.id} className={styles.card}>
              <img
                src={`/${product.image}`}
                alt={product.name}
                className={styles.image}
              />

              <p className={styles.name}>{product.name}</p>

              <div className={styles.prices}>
                {showDiscount && hasDiscount ? (
                  <>
                    <p className={styles.priceDiscount}>${product.price}</p>
                    <p className={styles.priceFull}>${product.fullPrice}</p>
                  </>
                ) : (
                  <p className={styles.priceDiscount}>${product.price}</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
