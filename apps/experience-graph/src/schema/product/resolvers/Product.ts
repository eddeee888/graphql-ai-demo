import { graphql } from '../../../gql';
import type { ProductResolvers } from './../../types.generated';

export const Product: ProductResolvers = {
  inStock: async ({ stockCount }) => {
    return stockCount > 0;
  },
  rating: async ({ id }, _, { execute }) => {
    const resp = await execute(
      graphql(`
        query ProductRating($id: ID!) {
          productRatingByProductIds(ids: [$id]) {
            result {
              id
              average
            }
          }
        }
      `),
      { id },
    );

    const result = resp.data?.productRatingByProductIds?.result[0];

    if (!result) {
      return {
        __typename: 'ResponseError',
        type: 'SERVER_ERROR',
      };
    }

    return {
      __typename: 'ProductRatingResponseSuccess',
      result: {
        id: result.id,
        value: result.average,
      },
    };
  },
};
