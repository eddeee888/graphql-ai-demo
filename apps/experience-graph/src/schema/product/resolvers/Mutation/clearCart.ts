import { graphql } from '../../../../gql';
import { execute } from '../../../execute';
import type { MutationResolvers } from './../../../types.generated';

const ClearCartDoc = graphql(`
  mutation ClearCart {
    clearCart {
      id
      items {
        ...CartItemMapper
      }
    }
  }
`);
export const clearCart: NonNullable<
  MutationResolvers['clearCart']
> = async () => {
  try {
    const result = await execute(ClearCartDoc);

    if (!result.data) {
      return {
        __typename: 'ResponseError',
        type: 'SERVER_ERROR',
      };
    }

    return {
      __typename: 'ClearCartResponseSuccess',
      result: result.data.clearCart,
    };
  } catch {
    return {
      __typename: 'ResponseError',
      type: 'SERVER_ERROR',
    };
  }
};
