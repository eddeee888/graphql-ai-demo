import { graphql } from '../../../../gql';
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
> = async (_parent, { input }, { execute, pubSub, userId }) => {
  try {
    if (!userId) {
      return {
        __typename: 'ResponseError',
        type: 'SERVER_ERROR',
      };
    }

    const itemCount = input.count || 1;

    const response = await execute(AddItemToCartDoc, {
      input: {
        userId,
        productId: input.productId,
        count: itemCount,
      },
    });

    if (!response.data) {
      return {
        __typename: 'ResponseError',
        type: 'SERVER_ERROR',
      };
    }

    pubSub.publish('cartUpdates', userId, {
      userId,
      addedProductId: input.productId,
      count: itemCount,
    });

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
