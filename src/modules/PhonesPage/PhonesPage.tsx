import { useSearchParams } from 'react-router-dom';
import { useProducts } from '../../hooks/useProducts';
import { useSort } from '../../hooks/useSort';
import { WithLoader } from '../../components/WithLoader';
// eslint-disable-next-line max-len
import { ProductsList } from '../CatalogPage/components/ProductsList';
import { Pagination } from '../../shared/Pagination';
import { SortSelect } from '../../modules/SortSelect/SortSelect';
import styles from './PhonesPage.module.scss';

export const PhonesPage = () => {
  const { products, loading, error } = useProducts();
  const [params, setParams] = useSearchParams();

  const setParam = (key: string, value: string | null) => {
    const newParams = new URLSearchParams(params);

    if (value === null) {
      newParams.delete(key);
    } else {
      newParams.set(key, value);
    }

    setParams(newParams);
  };

  const phones = products.filter(p => p.category === 'phones');

  const { sort, sortedProducts, setSort } = useSort(
    phones,
    Object.fromEntries(params),
    setParam,
  );

  return (
    <WithLoader loading={loading} error={error}>
      <div className={styles.wrapper}>
        <h1 className={styles.title}>Mobile phones</h1>

        <div className={styles.topBar}>
          <SortSelect sort={sort} setSort={setSort} />
          <Pagination
            total={sortedProducts.length}
            currentPage={Number(params.get('page')) || 1}
            totalPages={Math.ceil(sortedProducts.length / 10)}
            onPageChange={page => setParam('page', page.toString())}
          />
        </div>

        <ProductsList products={sortedProducts} />
      </div>
    </WithLoader>
  );
};
