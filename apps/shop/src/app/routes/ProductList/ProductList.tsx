import { useState, useEffect, FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@apollo/client/react';
import { ProductListDoc } from './ProductList.graphql';
import { ProductGrid } from './ProductGrid';
import { LoadingSpinner } from '../../components/LoadingSpinner';
import { ErrorMessage } from '../../components/ErrorMessage';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { Select } from '../../components/Select';
import { Checkbox } from '../../components/Checkbox';

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
    <div className="mx-auto p-4 md:p-6 max-w-7xl">
      <header className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl mb-2">Our Products</h1>
        <p>Explore our wide selection of high-quality products</p>
      </header>

      <div className="p-6 rounded-lg mb-8 bg-gray-200">
        <div className="mb-4">
          <Input
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
          />
        </div>

        <div className="flex flex-wrap flex-col md:flex-row gap-4 items-stretch md:items-center">
          <Select
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value);
            }}
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </Select>
          <Checkbox
            checked={inStockOnly}
            onChange={(e) => {
              setInStockOnly(e.target.checked);
            }}
          >
            In Stock Only
          </Checkbox>
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
            const totalProducts = data.products.pagination.total;
            const totalPages = data.products.pagination.totalPages;

            return (
              <>
                <div className="text-gray-400 mb-4 text-sm">
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
                  <div className="flex items-center justify-center gap-4 m-auto mt-12 pt-6 border-gray-200 border-t">
                    <Button
                      variant="secondary"
                      disabled={currentPage === 1}
                      onClick={() => {
                        if (currentPage > 1) {
                          setCurrentPage(currentPage - 1);
                        }
                      }}
                    >
                      Previous
                    </Button>
                    <span>
                      Page {currentPage} of {totalPages}
                    </span>
                    <Button
                      variant="secondary"
                      disabled={currentPage === totalPages}
                      onClick={() => {
                        if (currentPage < totalPages) {
                          setCurrentPage(currentPage + 1);
                        }
                      }}
                    >
                      Next
                    </Button>
                  </div>
                )}
              </>
            );
          })()
        : null}
    </div>
  );
};
