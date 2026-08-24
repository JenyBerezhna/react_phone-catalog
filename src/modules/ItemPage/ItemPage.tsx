import { useNavigate, useParams } from 'react-router-dom';

import styles from './ItemPage.module.scss';

import { ItemGallery } from './ItemGallery/ItemGallery';
import { ItemVariants } from './ItemVariants/ItemVariants';
import { ItemSpec } from './ItemSpec/ItemSpec';
import { ItemDescription } from './ItemDescription/ItemDescription';

import { Breadcrumbs } from '../../components/Breadcrumbs/Breadcrumbs';
import { BackButton } from '../../components/BackButton/BackButton';
import { WithLoader } from '../../components/WithLoader';

import { useItemDetails } from '../../hooks/useItemDetails';
import { useProducts } from '../../hooks/useProducts';
import { useSuggestedProducts } from '../../hooks/useSuggestedProducts';
import { getItemUrl } from '../../shared/helpers/getItemUrl';

import { Slider } from '../../components/Slider/Slider';

export const ItemPage: React.FC = () => {
  const { itemId } = useParams();
  const navigate = useNavigate();

  const { products: allProducts } = useProducts();

  const listProduct = allProducts.find(product => product.itemId === itemId);

  const { product, loading, error } = useItemDetails(
    itemId || '',
    listProduct?.category || '',
  );

  const { suggested, loadingSuggested } = useSuggestedProducts(
    product,
    allProducts,
  );

  if (loading) {
    return (
      <WithLoader loading={true} error={null}>
        <div className={styles.skeleton}>Loading item...</div>
      </WithLoader>
    );
  }

  if (error || !product) {
    return (
      <WithLoader loading={false} error={error ? String(error) : null}>
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

      <div className={styles.columns}>
        <ItemGallery images={product.images} />

        <ItemVariants
          product={product}
          onColorChange={newColor =>
            navigate(
              getItemUrl(product.namespaceId, product.capacity, newColor),
            )
          }
          onCapacityChange={newCapacity =>
            navigate(
              getItemUrl(product.namespaceId, newCapacity, product.color),
            )
          }
        />
      </div>

      <ItemDescription product={product} />
      <ItemSpec product={product} />

      {!loadingSuggested && suggested.length > 0 && (
        <Slider
          title="You may also like"
          products={suggested}
          showDiscount={false}
        />
      )}
    </section>
  );
};
