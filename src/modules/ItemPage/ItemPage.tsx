import { useNavigate, useParams } from 'react-router-dom';
import { useRef } from 'react';

import styles from './ItemPage.module.scss';

import { ItemGallery } from './ItemGallery/ItemGallery';
import { ItemVariants } from './ItemVariants/ItemVariants';
import { ItemSpec } from './ItemSpec/ItemSpec';
import { ItemDescription } from './ItemDescription/ItemDescription';

import { Breadcrumbs } from '../../components/Breadcrumbs/Breadcrumbs';
import { BackButton } from '../../components/BackButton/BackButton';
import { WithLoader } from '../../components/WithLoader';
import { Card } from '../Card/Card';

import { useItemDetails } from '../../hooks/useItemDetails';
import { useProducts } from '../../hooks/useProducts';
import { useSuggestedProducts } from '../../hooks/useSuggestedProducts';

import layoutStyles from '../../components/Layout/Layout.module.scss';

export const ItemPage: React.FC = () => {
  const { itemId } = useParams();
  const navigate = useNavigate();

  // Lightweight list product (for category)
  const { products: allProducts } = useProducts();
  const listProduct = allProducts.find(p => p.itemId === itemId);

  // Full product details
  const { product, loading, error } = useItemDetails(
    itemId || '',
    listProduct?.category || '',
  );

  // Slider ref
  const ref = useRef<HTMLDivElement>(null);

  // Suggested products — MUST come AFTER product is defined
  const { suggested, loadingSuggested } = useSuggestedProducts(product);

  // Scroll logic
  const scroll = (direction: 'left' | 'right') => {
    const container = ref.current;

    if (!container) {
      return;
    }

    const card = container.querySelector(
      '[class*="card--slider"]',
    ) as HTMLElement | null;

    if (!card) {
      return;
    }

    const cardWidth = card.getBoundingClientRect().width;
    const gap = 16;
    const offset = direction === 'left' ? -(cardWidth + gap) : cardWidth + gap;

    container.scrollBy({ left: offset, behavior: 'smooth' });
  };

  // Loading state
  if (loading) {
    return (
      <WithLoader loading={true} error={null}>
        <div className={styles.skeleton}>Loading item...</div>
      </WithLoader>
    );
  }

  // Error state
  if (error || !product) {
    return (
      <WithLoader loading={false} error={String(error)}>
        <div className={styles.skeleton}>Unable to load item</div>
      </WithLoader>
    );
  }

  return (
    <section className={styles.page}>
      <Breadcrumbs
        items={[
          { label: 'Home', to: '/' },
          { label: product.category, to: `/${product.category}` },
          { label: product.name },
        ]}
      />

      <BackButton className={styles.back} />

      <h1 className={styles.title}>{product.name}</h1>

      {/* MAIN LAYOUT */}
      <div className={styles.columns}>
        <ItemGallery images={product.images} />

        <ItemVariants
          product={product}
          onColorChange={newColor =>
            navigate(
              `/item/${product.namespaceId}-${product.capacity}-${newColor}`,
            )
          }
          onCapacityChange={newCapacity =>
            navigate(
              `/item/${product.namespaceId}-${newCapacity}-${product.color}`,
            )
          }
        />
      </div>

      <ItemDescription product={product} />
      <ItemSpec product={product} />

      {/* SUGGESTED PRODUCTS */}
      {!loadingSuggested && suggested.length > 0 && (
        <section className={styles.section}>
          <div className={styles.suggestedHeader}>
            <h2 className={styles.sectionTitle}>You may also like</h2>

            <div className={styles.controls}>
              <button className={styles.arrow} onClick={() => scroll('left')}>
                <img src="/img/icons/ArrowLeft.svg" alt="Previous" />
              </button>

              <button className={styles.arrow} onClick={() => scroll('right')}>
                <img src="/img/icons/ArrowRight.svg" alt="Next" />
              </button>
            </div>
          </div>

          <div className={layoutStyles['layout--slider']} ref={ref}>
            {suggested.map(p => (
              <Card key={p.id} product={p} variant="slider" />
            ))}
          </div>
        </section>
      )}
    </section>
  );
};
