import { useQuery } from '@apollo/client/react';
import { FC } from 'react';
import { CartDoc } from './Cart.graphql';
import { LoadingSpinner } from '../../components/LoadingSpinner';
import { ErrorMessage } from '../../components/ErrorMessage';
import styles from './Cart.module.css';

export const Cart: FC = () => {
  const cartId = 'user-1'; // FIXME: should get from header

  const { data, loading, error } = useQuery(CartDoc, {
    variables: { id: cartId },
  });

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error || data?.cart.__typename === 'ResponseError') {
    return <ErrorMessage message="Failed to load cart" />;
  }

  const cart = data?.cart.result;
  if (!cart) {
    return <ErrorMessage message="Cart not found" />;
  }

  return (
    <div className={styles['cart-container']}>
      <h2>Cart</h2>
      <div>
        {cart.items.length === 0 && (
          <div>
            Cart is empty. Add products <a href="/products">here</a>
          </div>
        )}
        {cart.items.map((item) => {
          if (item.product.__typename === 'ResponseError') {
            return null;
          }
          return (
            <div key={item.product.result.id}>
              <span>{item.product.result.name}: </span>
              <span>{item.count}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
