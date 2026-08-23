import { useNavigate, useParams } from 'react-router-dom';

import styles from './ItemPage.module.scss';

import { ItemGallery } from './ItemGallery/ItemGallery';
import { ItemVariants } from './ItemVariants/ItemVariants';
import { ItemSpec } from './ItemSpec/ItemSpec';

import { Breadcrumbs } from '../../components/Breadcrumbs/Breadcrumbs';
import { BackButton } from '../../components/BackButton/BackButton';
import { WithLoader } from '../../components/WithLoader';
import { Card } from '../Card/Card';

import { useItemDetails } from '../../shared/helpers/useItemDetails';
import { useProducts } from '../../hooks/useProducts';

export const ItemPage: React.FC = () => {
  const { itemId } = useParams();
  const navigate = useNavigate();

  // FULL DETAILS (ProductDetails)
  const { product, loading, error } = useItemDetails(itemId || '');

  // LIST (Product)
  const { products: allProducts } = useProducts();

  const redirectToVariant = (color: string, capacity: string) => {
    if (!product) {
      return;
    }

    const newItemId = `${product.namespaceId}-${capacity}-${color}`;

    navigate(`/item/${newItemId}`);
  };

  if (loading) {
    return (
      <WithLoader loading={true} error={undefined}>
        <div className={styles.skeleton}>Loading item...</div>
      </WithLoader>
    );
  }

  if (error || !product) {
    return (
      <WithLoader loading={false} error={!!error}>
        <div className={styles.skeleton}>Unable to load item</div>
      </WithLoader>
    );
  }

  const suggested = allProducts
    .filter(p => p.category === product.category && p.itemId !== product.id)
    .slice(0, 12);

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

      <div className={styles.columns}>
        <ItemGallery images={product.images} />

        <ItemVariants
          product={product}
          onColorChange={newColor =>
            redirectToVariant(newColor, product.capacity)
          }
          onCapacityChange={newCapacity =>
            redirectToVariant(product.color, newCapacity)
          }
        />
      </div>

      <ItemSpec product={product} />

      <WithLoader loading={false} error={undefined}>
        {suggested.length > 0 && (
          <div className={styles.suggested}>
            <h2>You may also like</h2>
            <div className="layout--slider">
              {suggested.map(p => (
                <Card key={p.id} product={p} variant="slider" />
              ))}
            </div>
          </div>
        )}
      </WithLoader>
    </section>
  );
};
