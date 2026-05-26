import { graphql } from '../../../../gql';
import type { QueryResolvers } from './../../../types.generated';

const CartDoc = graphql(`
  query Cart($id: ID!) {
    cart(id: $id) {
      result {
        id
        items {
          ...CartItemMapper
        }
      }
    }
  }
`);

export const cart: NonNullable<QueryResolvers['cart']> = async (
  _parent,
  { id },
  { execute },
) => {
  try {
    const response = await execute(CartDoc, { id });

    const result = response.data?.cart.result;
    if (!result) {
      return {
        __typename: 'ResponseError',
        type: 'SERVER_ERROR',
      };
    }

    return {
      __typename: 'CartResponseSuccess',
      result,
    };
  } catch {
    return {
      __typename: 'ResponseError',
      type: 'SERVER_ERROR',
    };
  }
};
