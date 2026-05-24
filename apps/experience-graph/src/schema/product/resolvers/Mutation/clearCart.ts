import { graphql } from '../../../../gql';
import { execute } from '../../../execute';
import type { MutationResolvers } from './../../../types.generated';

const ClearCartDoc = graphql(`
  mutation ClearCart {
    clearCart {
      result {
        id
        items {
          ...CartItemMapper
        }
      }
    }
  }
`);
export const clearCart: NonNullable<
  MutationResolvers['clearCart']
> = async () => {
  try {
    const response = await execute(ClearCartDoc);

    if (!response.data) {
      return {
        __typename: 'ResponseError',
        type: 'SERVER_ERROR',
      };
    }

    return {
      __typename: 'ClearCartResponseSuccess',
      result: response.data.clearCart.result,
    };
  } catch {
    return {
      __typename: 'ResponseError',
      type: 'SERVER_ERROR',
    };
  }
};
