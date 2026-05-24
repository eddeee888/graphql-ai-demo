import { graphql } from '../../../../gql';
import { execute } from '../../../execute';
import type { MutationResolvers } from './../../../types.generated';

const AddItemToCartDoc = graphql(`
  mutation AddItemToCart($input: AddItemToCartInput!) {
    addItemToCart(input: $input) {
      result {
        id
        items {
          ...CartItemMapper
        }
      }
    }
  }
`);

export const addItemToCart: NonNullable<
  MutationResolvers['addItemToCart']
> = async (_parent, { input }) => {
  try {
    const response = await execute(AddItemToCartDoc, {
      input: {
        productId: input.productId,
        count: 1,
      },
    });

    if (!response.data) {
      return {
        __typename: 'ResponseError',
        type: 'SERVER_ERROR',
      };
    }

    return {
      __typename: 'AddItemToCartResponseSuccess',
      result: response.data.addItemToCart.result,
    };
  } catch {
    return {
      __typename: 'ResponseError',
      type: 'SERVER_ERROR',
    };
  }
};
