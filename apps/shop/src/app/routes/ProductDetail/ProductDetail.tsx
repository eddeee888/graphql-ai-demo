import { useParams, useNavigate } from 'react-router-dom';
import styles from './ProductDetail.module.css';
import { FC } from 'react';
import { useMutation, useQuery } from '@apollo/client/react';
import {
  AddItemToCardDoc,
  ProductDetailDoc,
  RateProductDoc,
} from './ProductDetail.graphql';
import { ErrorMessage } from '../../components/ErrorMessage';
import { LoadingSpinner } from '../../components/LoadingSpinner';

const handleRetry = () => {
  // Force re-fetch by navigating to the same URL
  window.location.reload();
};

const productNotFoundError = (
  <ErrorMessage message="Product not found" onRetry={handleRetry} />
);

export const ProductDetail: FC = () => {
  const { id } = useParams<{ id: string }>();

  if (!id) {
    return productNotFoundError;
  }

  return <ProductDetailInner id={id} />;
};

const ProductDetailInner: FC<{ id: string }> = ({ id }) => {
  const navigate = useNavigate();
  const { data, loading, error } = useQuery(ProductDetailDoc, {
    variables: { id },
  });

  const [rateProduct] = useMutation(RateProductDoc);
  const [addItemToCard] = useMutation(AddItemToCardDoc);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error || data?.product.__typename === 'ResponseError') {
    return <ErrorMessage message="Error!" onRetry={handleRetry} />;
  }

  if (!data) {
    return null;
  }

  const product = data.product.result;

  if (!product) {
    return <ErrorMessage message="Product not found" onRetry={handleRetry} />;
  }

  const getStars = (rating: number) => {
    if (!product) return [];
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(i < Math.floor(rating));
    }
    return stars;
  };

  return (
    <div className={styles['product-detail-container']}>
      <button
        className={styles['back-button']}
        onClick={() => {
          navigate('/products');
        }}
      >
        ← Back to Products
      </button>

      <div className={styles['product-detail']}>
        <div className={styles['product-image']}>
          <img src={product.imageUrl} alt={product.name} />
          {!product.inStock && (
            <div className={styles['out-of-stock-overlay']}>Out of Stock</div>
          )}
        </div>

        <div className={styles['product-info']}>
          <div className={styles['product-category']}>{product.category}</div>
          <h1 className={styles['product-name']}>{product.name}</h1>

          <div className={styles['product-rating']}>
            <span className={styles['stars']}>
              {getStars(
                product.rating.__typename === 'ProductRatingResponseSuccess'
                  ? product.rating.result.value
                  : 0,
              ).map((filled, index) => (
                <span
                  key={index}
                  className={filled ? styles['filled'] : ''}
                  onClick={() => {
                    rateProduct({
                      variables: {
                        input: {
                          id,
                          rating: index + 1,
                        },
                      },
                    });
                  }}
                >
                  ★
                </span>
              ))}
            </span>
            <span className={styles['review-count']}>
              ({product.reviewCount} reviews)
            </span>
          </div>

          <div className={styles['product-price']}>
            ${product.price.toFixed(2)}
          </div>

          <div className={styles['product-availability']}>
            {product.inStock ? (
              <span className={styles['in-stock']}>✓ In Stock</span>
            ) : (
              <span className={styles['out-of-stock']}>Out of Stock</span>
            )}
          </div>

          <div className={styles['product-description']}>
            <h2>Description</h2>
            <p>{product.description}</p>
          </div>

          <div className={styles['product-actions']}>
            <button
              className={styles['add-to-cart-btn']}
              onClick={async () => {
                await addItemToCard({
                  variables: {
                    input: {
                      productId: product.id,
                    },
                  },
                });
                alert(`Added ${product.name} to cart!`);
              }}
              disabled={!product.inStock}
            >
              {product.inStock ? 'Add to Cart' : 'Out of Stock'}
            </button>
          </div>

          <div className={styles['product-details']}>
            <h3>Product Details</h3>
            <ul>
              <li>
                <strong>Product ID:</strong> {product.id}
              </li>
              <li>
                <strong>Category:</strong> {product.category}
              </li>
              {product.rating.__typename === 'ProductRatingResponseSuccess' && (
                <li>
                  <strong>Rating:</strong>{' '}
                  {product.rating.result.value.toFixed(1)} out of 5
                </li>
              )}
              <li>
                <strong>Reviews:</strong> {product.reviewCount} customer reviews
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
