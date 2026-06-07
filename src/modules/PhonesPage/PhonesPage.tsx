import { useMemo } from 'react';

import styles from './PhonesPage.module.scss';
import layoutStyles from '../../components/Layout/Layout.module.scss';

import { WithLoader } from '../../components/WithLoader';
import { Pagination } from '../../components/Pagination/Pagination';
import { SortSelect } from '../../modules/SortSelect/SortSelect';
import { Card } from '../../modules/Card/Card';

import { useProducts } from '../../hooks/useProducts';
import { useSort } from '../../hooks/useSort';
import { usePagination } from '../../hooks/usePagination';
import { useQueryParams } from '../../hooks/useQueryParams';

export const PhonesPage = () => {
  const { products, loading, error } = useProducts();
  const { params, setParam } = useQueryParams();

  // Filter phones
  const phones = useMemo(
    () => products.filter(p => p.category === 'phones'),
    [products],
  );

  // Sorting
  const { sort, sortedProducts, setSort } = useSort(phones, params, setParam);

  // Pagination
  const { paginatedProducts, page, perPage, totalPages, setPage, setPerPage } =
    usePagination({ products: sortedProducts, params, setParam });

  return (
    <WithLoader loading={loading} error={error}>
      <section className={styles.wrapper}>
        <h1 className={styles.title}>Mobile phones</h1>

        {/* Top bar */}
        <div className={styles.topBar}>
          <SortSelect sort={sort} setSort={setSort} />

          {/* Per-page selector */}
          <div className={styles.control}>
            <label htmlFor="perpage">Items on page</label>
            <select
              id="perpage"
              value={perPage}
              onChange={e => setPerPage(e.target.value)}
            >
              <option value="4">4</option>
              <option value="8">8</option>
              <option value="16">16</option>
              <option value="all">All</option>
            </select>
          </div>

          {/* Pagination */}
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setPage}
            total={sortedProducts.length}
          />
        </div>

        {/* GRID — paginated phones */}
        <div className={layoutStyles['layout--grid']}>
          {paginatedProducts.map(product => (
            <Card
              key={product.id}
              product={product}
              variant="grid"
              showPrices
              showSpecs
              showActions
              showDiscount
            />
          ))}
        </div>
      </section>
    </WithLoader>
  );
};
