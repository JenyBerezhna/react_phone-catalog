import { useParams } from 'react-router-dom';
import { useState } from 'react';

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
  const { item, loading, error } = useItemDetails(itemId!);

  const { suggested, loadingSuggested, errorSuggested } = useSuggestedProducts(
    itemId!,
  );

  const [selectedColor, setSelectedColor] = useState('');
  const [selectedCapacity, setSelectedCapacity] = useState('');

  if (loading || error) {
    return (
      <WithLoader loading={loading} error={error}>
        {null}
      </WithLoader>
    );
  }

  if (!item) {
    return <p>Item not found</p>;
  }

  return (
    <section className={styles.page}>
      <Breadcrumbs
        items={[
          { label: 'Home', to: '/' },
          { label: item.category, to: `/${item.category}` },
          { label: item.name },
        ]}
      />

      <BackButton className={styles.back} />

      <h1 className={styles.title}>{item.name}</h1>

      <div className={styles.columns}>
        <ItemGallery images={item.images} />

        <ItemInfo
          item={item}
          selectedColor={selectedColor}
          selectedCapacity={selectedCapacity}
          onColorChange={setSelectedColor}
          onCapacityChange={setSelectedCapacity}
        />
      </div>

      <ItemSpec item={item} />

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
