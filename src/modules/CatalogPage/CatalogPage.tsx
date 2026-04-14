import { useMemo } from 'react';

import { ProductsList } from './components/ProductsList';
import { Pagination } from '../../shared/Pagination/Pagination';
import { WithLoader } from '../../components/WithLoader';

import { useProducts } from '../../hooks/useProducts';
import { useQueryParams } from '../../hooks/useQueryParams';
import { useSort } from '../../hooks/useSort';
import { usePagination } from '../../hooks/usePagination';

import { Product } from '../../types/Product';

type Props = {
  type: 'phones' | 'tablets' | 'accessories';
};

const TITLES = {
  phones: 'Phones',
  tablets: 'Tablets',
  accessories: 'Accessories',
} as const;

export const ProductsPage: React.FC<Props> = ({ type }) => {
  const { products, loading, error } = useProducts();
  const { params, setParam } = useQueryParams();

  // Filter by category
  const filtered = useMemo(
    () => products.filter((p: Product) => p.category === type),
    [products, type],
  );

  // Sorting
  const { sort, sortedProducts, setSort } = useSort(filtered, params, setParam);

  // Pagination
  const { paginatedProducts, page, perPage, totalPages, setPage, setPerPage } =
    usePagination({ products: sortedProducts, params, setParam });

  return (
    <section>
      <h1>{TITLES[type]} page</h1>

      <WithLoader
        loading={loading}
        error={error}
        errorSlot={
          <div className="error">
            <p>Something went wrong</p>
            <button onClick={() => window.location.reload()}>Reload</button>
          </div>
        }
      >
        {filtered.length === 0 ? (
          <p>There are no {TITLES[type].toLowerCase()} yet</p>
        ) : (
          <>
            {/* Sort */}
            <select
              value={sort}
              onChange={e =>
                setSort(e.target.value as 'age' | 'title' | 'price')
              }
            >
              <option value="age">Newest</option>
              <option value="title">Alphabetically</option>
              <option value="price">Cheapest</option>
            </select>

            {/* Per page */}
            <select value={perPage} onChange={e => setPerPage(e.target.value)}>
              <option value="4">4</option>
              <option value="8">8</option>
              <option value="16">16</option>
              <option value="all">All</option>
            </select>

            <ProductsList products={paginatedProducts} />

            {totalPages > 1 && perPage !== 'all' && (
              <Pagination
                currentPage={page}
                totalPages={totalPages}
                onPageChange={setPage}
                total={sortedProducts.length}
              />
            )}
          </>
        )}
      </WithLoader>
    </section>
  );
};
