import { useSearchParams } from 'react-router-dom';
import { useProducts } from '../../hooks/useProducts';
import { useSort } from '../../hooks/useSort';
import { WithLoader } from '../../components/WithLoader';
// eslint-disable-next-line max-len
import { ProductsList } from '../CatalogPage/components/ProductsList';
import { Pagination } from '../../shared/Pagination';
import { SortSelect } from '../../modules/SortSelect/SortSelect';
import styles from './TabletsPage.module.scss';

export const TabletsPage = () => {
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

  const tablets = products.filter(p => p.category === 'tablets');

  const { sort, sortedProducts, setSort } = useSort(
    tablets,
    Object.fromEntries(params),
    setParam,
  );

  return (
    <WithLoader loading={loading} error={error}>
      <div className={styles.wrapper}>
        <h1 className={styles.title}>Tablets</h1>

        <div className={styles.topBar}>
          <SortSelect sort={sort} setSort={setSort} />
          <Pagination
            total={sortedProducts.length}
            currentPage={1}
            totalPages={Math.ceil(sortedProducts.length / 10)}
            onPageChange={page => setParam('page', page.toString())}
          />
        </div>

        <ProductsList products={sortedProducts} />
      </div>
    </WithLoader>
  );
};
