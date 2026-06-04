import { graphql } from '../../../gql';
import type { CartItemResolvers } from './../../types.generated';

const CartItemProductDoc = graphql(`
  query CartItemProduct($id: ID!) {
    productsByIds(ids: [$id]) {
      result {
        ...ProductMapper
      }
    }
  }
`);

export const CartItem: CartItemResolvers = {
  product: async ({ productId }, _arg, { execute }) => {
    const response = await execute(CartItemProductDoc, {
      id: productId,
    });

    const product = response.data?.productsByIds?.result[0];

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
