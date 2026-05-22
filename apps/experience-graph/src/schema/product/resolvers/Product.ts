import { graphql } from '../../../gql';
import { execute } from '../../execute';
import type { ProductResolvers } from './../../types.generated';

const ProductRatingDoc = graphql(`
  query ProductRating($id: ID!) {
    productRating(id: $id) {
      id
      value
    }
  }
`);

export const Product: ProductResolvers = {
  inStock: async ({ stockCount }) => {
    return stockCount > 0;
  },
  rating: async ({ id }) => {
    const result = await execute(ProductRatingDoc, {
      id,
    });

    if (!result.data) {
      return {
        __typename: 'ResponseError',
        type: 'SERVER_ERROR',
      };
    }

    return {
      __typename: 'ProductRatingResponseSuccess',
      result: result.data.productRating,
    };
  },
};
