import { useState, useEffect, FC } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './ProductList.module.css';
import { useQuery } from '@apollo/client/react';
import { ProductListDoc } from './ProductList.graphql';
import { ProductGrid } from './ProductGrid';
import { LoadingSpinner } from '../../components/LoadingSpinner';
import { ErrorMessage } from '../../components/ErrorMessage';

const categories = [
  'Electronics',
  'Clothing',
  'Home & Kitchen',
  'Sports',
  'Accessories',
];

type Filter = {
  category?: string | null | undefined;
  inStock?: boolean | null | undefined;
  maxPrice?: number | null | undefined;
  minPrice?: number | null | undefined;
  searchTerm?: string | null | undefined;
  page?: number | null | undefined;
  pageSize?: number | null | undefined;
};

export const ProductList: FC = () => {
  const navigate = useNavigate();

  // Filter state
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [inStockOnly, setInStockOnly] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState<Filter>({});

  const { data, error, loading } = useQuery(ProductListDoc, {
    variables: {
      input: {
        categories: filter.category ? [filter.category] : undefined,
        inStock: filter.inStock,
        maxPrice: filter.maxPrice,
        minPrice: filter.minPrice,
        searchTerm: filter.searchTerm,
      },
      pagination: {
        page: currentPage,
        pageSize: filter.pageSize,
      },
    },
  });

  // Update filter when filter inputs change
  useEffect(() => {
    const newFilter: Filter = {};

    if (searchTerm) {
      newFilter.searchTerm = searchTerm;
    }
    if (selectedCategory) {
      newFilter.category = selectedCategory;
    }
    if (inStockOnly) {
      newFilter.inStock = true;
    }

    setFilter(newFilter);
    setCurrentPage(1); // Reset to first page when filter changes
  }, [searchTerm, selectedCategory, inStockOnly]);

  return (
    <div className={styles['product-list-container']}>
      <header className={styles['page-header']}>
        <h1>Our Products</h1>
        <p>Explore our wide selection of high-quality products</p>
      </header>

      <div className={styles['filters-section']}>
        <div className={styles['search-box']}>
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
            className={styles['search-input']}
          />
        </div>

        <div className={styles['filter-controls']}>
          <select
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value);
            }}
            className={styles['filter-select']}
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>

          <label className={styles['checkbox-label']}>
            <input
              type="checkbox"
              checked={inStockOnly}
              onChange={(e) => {
                setInStockOnly(e.target.checked);
              }}
            />
            In Stock Only
          </label>
        </div>
      </div>

      {loading && <LoadingSpinner />}

      {(error || data?.products.__typename === 'ResponseError') && (
        <ErrorMessage
          message={'Oopsie! Error happened!'}
          onRetry={() => {
            setFilter({ ...filter });
          }}
        />
      )}

      {data && data.products.__typename === 'ProductsResponseSuccess'
        ? (() => {
            const products = data.products.result;
            const totalProducts = data.products.total;
            const totalPages = data.products.totalPages;

            return (
              <>
                <div className={styles['results-info']}>
                  Showing {products.length} of {totalProducts} products
                </div>

                <ProductGrid
                  products={products.map((product) => ({
                    id: product.id,
                    category: product.category,
                    imageUrl: product.imageUrl,
                    inStock: product.inStock,
                    name: product.name,
                    price: product.price,
                    reviewCount: product.reviewCount,
                    rating:
                      product.rating.__typename ===
                      'ProductRatingResponseSuccess'
                        ? product.rating.result.value
                        : 0,
                  }))}
                  onProductSelect={(product) => {
                    navigate(`/products/${product.id}`);
                  }}
                />

                {totalPages > 1 && (
                  <div className={styles['pagination']}>
                    <button
                      className={styles['btn-secondary']}
                      disabled={currentPage === 1}
                      onClick={() => {
                        if (currentPage > 1) {
                          setCurrentPage(currentPage - 1);
                        }
                      }}
                    >
                      Previous
                    </button>
                    <span className={styles['page-info']}>
                      Page {currentPage} of {totalPages}
                    </span>
                    <button
                      className={styles['btn-secondary']}
                      disabled={currentPage === totalPages}
                      onClick={() => {
                        if (currentPage < totalPages) {
                          setCurrentPage(currentPage + 1);
                        }
                      }}
                    >
                      Next
                    </button>
                  </div>
                )}
              </>
            );
          })()
        : null}
    </div>
  );
};
