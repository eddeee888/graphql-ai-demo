import { graphql } from '../../../gql';
import { execute } from '../../execute';
import type { CartItemResolvers } from './../../types.generated';

const CartItemProductDoc = graphql(`
  query CartItemProduct($id: ID!) {
    product(id: $id) {
      ...ProductMapper
    }
  }
`);

export const CartItem: CartItemResolvers = {
  product: async ({ productId }, _arg, _ctx) => {
    const result = await execute(CartItemProductDoc, {
      id: productId,
    });

    const product = result.data?.product;
    if (!product) {
      return {
        __typename: 'ResponseError',
        type: 'SERVER_ERROR',
      };
    }

    return {
      __typename: 'CartItemProductResponseSuccess',
      result: product,
    };
  },
};
