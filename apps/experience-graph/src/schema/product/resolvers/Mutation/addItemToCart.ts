import { graphql } from '../../../../gql';
import { execute } from '../../../execute';
import type { MutationResolvers } from './../../../types.generated';

const AddItemToCartDoc = graphql(`
  mutation AddItemToCart($input: AddItemToCartInput!) {
    addItemToCart(input: $input) {
      id
      items {
        ...CartItemMapper
      }
    }
  }
`);

export const addItemToCart: NonNullable<
  MutationResolvers['addItemToCart']
> = async (_parent, { input }) => {
  try {
    const result = await execute(AddItemToCartDoc, {
      input: {
        productId: input.productId,
        count: 1,
      },
    });

    if (!result.data) {
      return {
        __typename: 'ResponseError',
        type: 'SERVER_ERROR',
      };
    }

    return {
      __typename: 'AddItemToCartResponseSuccess',
      result: result.data.addItemToCart,
    };
  } catch {
    return {
      __typename: 'ResponseError',
      type: 'SERVER_ERROR',
    };
  }
};
