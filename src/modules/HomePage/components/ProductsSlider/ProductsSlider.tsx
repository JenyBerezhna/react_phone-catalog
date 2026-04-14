import { useRef } from 'react';
import { Model } from '../../../../types/Model';
import styles from './ProductsSlider.module.scss';

type Props = {
  title: string;
  products: Model[];
  showDiscount: boolean;
};

export const ProductsSlider: React.FC<Props> = ({
  title,
  products,
  showDiscount,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const scroll = (offset: number) => {
    ref.current?.scrollBy({ left: offset, behavior: 'smooth' });
  };

  return (
    <section className={styles.slider}>
      <div className={styles.header}>
        <h2 className={styles.title}>{title}</h2>

        <div className={styles.controls}>
          <button onClick={() => scroll(-300)}>‹</button>
          <button onClick={() => scroll(300)}>›</button>
        </div>
      </div>

      <div className={styles.list} ref={ref}>
        {products.map(model => {
          const hasDiscount = model.priceDiscount < model.priceRegular;

          return (
            <div key={model.id} className={styles.card}>
              <img src={`/${model.images[0]}`} alt={model.name} />
              <p>{model.name}</p>

              <div className={styles.prices}>
                {showDiscount && hasDiscount ? (
                  <>
                    <p className={styles.priceDiscount}>
                      ${model.priceDiscount}
                    </p>
                    <p className={styles.priceFull}>${model.priceRegular}</p>
                  </>
                ) : (
                  <p className={styles.priceDiscount}>${model.priceDiscount}</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
