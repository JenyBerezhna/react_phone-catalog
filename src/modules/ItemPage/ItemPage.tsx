import { useNavigate, useParams } from 'react-router-dom';

import styles from './ItemPage.module.scss';

import { ItemGallery } from './ItemGallery/ItemGallery';
import { ItemInfo } from './ItemInfo/ItemInfo';
import { ItemSpec } from './ItemSpec/ItemSpec';

import { Breadcrumbs } from '../../components/Breadcrumbs/Breadcrumbs';
import { BackButton } from '../../components/BackButton/BackButton';
import { WithLoader } from '../../components/WithLoader';
import { Card } from '../Card/Card';

import { useItemDetails } from '../../shared/helpers/useItemDetails';
import { useSuggestedProducts } from '../../hooks/useSuggestedProducts';

export const ItemPage = () => {
  const { itemId } = useParams();
  const navigate = useNavigate();

  const { product, loading, error } = useItemDetails(itemId!);
  const { suggested, loadingSuggested, errorSuggested } = useSuggestedProducts(
    itemId!,
  );

  // Redirect helper (single function)
  const redirectToVariant = (color: string, capacity: string) => {
    if (!product) {
      return;
    }

    const newItemId = `${product.namespaceId}-${capacity}-${color}`;

    navigate(`/item/${newItemId}`);
  };

  if (loading || error) {
    return (
      <WithLoader loading={loading} error={error}>
        {null}
      </WithLoader>
    );
  }

  if (!product) {
    return <p>Item not found</p>;
  }

  const selectedColor = product.color;
  const selectedCapacity = product.capacity;

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

        <ItemInfo
          product={product}
          selectedColor={selectedColor}
          selectedCapacity={selectedCapacity}
          onColorChange={newColor =>
            redirectToVariant(newColor, selectedCapacity)
          }
          onCapacityChange={newCapacity =>
            redirectToVariant(selectedColor, newCapacity)
          }
        />
      </div>

      <ItemSpec product={product} />

      <WithLoader loading={loadingSuggested} error={errorSuggested}>
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
