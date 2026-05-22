import { graphql } from '../../../../gql';
import { execute } from '../../../execute';
import type { QueryResolvers } from './../../../types.generated';

const CartDoc = graphql(`
  query Cart($id: ID!) {
    cart(id: $id) {
      id
      items {
        productId
        count
      }
    }
  }
`);

export const cart: NonNullable<QueryResolvers['cart']> = async (
  _parent,
  { id },
) => {
  try {
    const result = await execute(CartDoc, { id });

    const cardResult = result.data?.cart;
    if (!cardResult) {
      return {
        __typename: 'CartResponseSuccess',
        result: cardResult,
      };
    }

    return {
      __typename: 'CartResponseSuccess',
      result: {
        id: cardResult.id,
        items: cardResult.items,
      },
    };
  } catch {
    return {
      __typename: 'ResponseError',
      type: 'SERVER_ERROR',
    };
  }
};
