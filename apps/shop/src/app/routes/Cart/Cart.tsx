import { useMutation, useQuery } from '@apollo/client/react';
import { FC } from 'react';
import { CartDoc, ClearCartDoc } from './Cart.graphql';
import { LoadingSpinner } from '../../components/LoadingSpinner';
import { ErrorMessage } from '../../components/ErrorMessage';
import { Button } from '../../components/Button';
import { Link } from '../../components/Link';

export const Cart: FC = () => {
  const { data, loading, error } = useQuery(CartDoc);
  const [clearCart] = useMutation(ClearCartDoc);

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
    <div className="max-w-screen-sm m-auto p-5 border rounded mt-5">
      <h2 className="text-2xl text-gray-700 mb-2">Cart</h2>
      <div>
        {cart.items.length === 0 && (
          <div>
            Cart is empty. Add products <Link href="/products">here</Link>
          </div>
        )}
        {cart.items.length > 0 && (
          <>
            <div>
              {cart.items.map((item) => {
                if (item.product.__typename === 'ResponseError') {
                  return null;
                }
                return (
                  <div
                    key={item.product.result.id}
                    className="grid grid-cols-2 gap-2"
                  >
                    <span>{item.product.result.name}: </span>
                    <span className="text-right">x {item.count}</span>
                  </div>
                );
              })}
            </div>

            <div className="mt-5">
              <Button onClick={() => clearCart()}>Clear Cart</Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
