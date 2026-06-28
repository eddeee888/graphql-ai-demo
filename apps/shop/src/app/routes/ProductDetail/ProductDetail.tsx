import { useParams, useNavigate } from 'react-router-dom';
import { FC } from 'react';
import { useMutation, useQuery } from '@apollo/client/react';
import {
  AddItemToCardDoc,
  ProductDetailDoc,
  RateProductDoc,
} from './ProductDetail.graphql';
import { ErrorMessage } from '../../components/ErrorMessage';
import { LoadingSpinner } from '../../components/LoadingSpinner';
import { LinkButton } from '../../components/LinkButton';
import { StarRating } from '../../components/StarRating';
import { Button } from '../../components/Button';

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

  return (
    <div className="max-w-7xl m-auto p-6">
      <LinkButton
        onClick={() => {
          navigate('/products');
        }}
      >
        ← Back to Products
      </LinkButton>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-white border rounded-lg p-8 shadow-md">
        <div className="relative w-full h-[400px] lg:h-[400px] bg-gray-50 rounded-lg overflow-hidden">
          <img
            className="w-full h-full object-cover"
            src={product.imageUrl}
            alt={product.name}
          />
          {!product.inStock && (
            <div className="absolute inset-0 bg-black/70 text-white flex items-center justify-center font-bold text-2xl">
              Out of Stock
            </div>
          )}
        </div>

        <div className="flex flex-col gap-5">
          <div className="text-gray-400 text-sm uppercase">
            {product.category}
          </div>
          <h1 className="text-2xl m-0">{product.name}</h1>

          <div className="flex items-center gap-3">
            <StarRating
              rating={
                product.rating.__typename === 'ProductRatingResponseSuccess'
                  ? product.rating.result.value
                  : 0
              }
              onClick={(index) =>
                rateProduct({
                  variables: {
                    input: {
                      id,
                      rating: index + 1,
                    },
                  },
                })
              }
            />
            <span className="text-sm text-gray-400">
              ({product.reviewCount} reviews)
            </span>
          </div>

          <div className="font-bold text-2xl">${product.price.toFixed(2)}</div>

          <div>
            {product.inStock ? (
              <span className="text-green-500 font-semibold">✓ In Stock</span>
            ) : (
              <span className="text-red-500 font-semibold">Out of Stock</span>
            )}
          </div>

          <div className="border-t border-gray-400 py-5">
            <h2 className="text-lg mb-3">Description</h2>
            <p>{product.description}</p>
          </div>

          <div>
            <Button
              className="w-full"
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
            </Button>
          </div>

          <div className="border-t pt-5">
            <h3 className="text-xl mb-4">Product Details</h3>
            <ul>
              <li className="py-2 border-b">
                <strong>Product ID:</strong> {product.id}
              </li>
              <li className="py-2 border-b">
                <strong>Category:</strong> {product.category}
              </li>
              {product.rating.__typename === 'ProductRatingResponseSuccess' && (
                <li className="py-2 border-b">
                  <strong>Rating:</strong>{' '}
                  {product.rating.result.value.toFixed(1)} out of 5
                </li>
              )}
              <li className="py-2">
                <strong>Reviews:</strong> {product.reviewCount} customer reviews
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
