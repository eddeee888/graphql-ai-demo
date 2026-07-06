import { graphql } from '../../../../gql';
import type { MutationResolvers } from './../../../types.generated';

const RateProductDoc = graphql(`
  mutation RateProduct($input: RateProductInput!) {
    rateProduct(input: $input) {
      result {
        id
        value
      }
    }
  }
`);

export const rateProduct: NonNullable<
  MutationResolvers['rateProduct']
> = async (_parent, { input }, { userId, execute }) => {
  try {
    if (!userId) {
      return {
        __typename: 'ResponseError',
        type: 'SERVER_ERROR',
      };
    }

    const response = await execute(RateProductDoc, {
      input: {
        userId,
        productId: input.id,
        rating: input.rating,
      },
    });

    const rating = response.data?.rateProduct?.result.value;
    if (rating === undefined) {
      return {
        __typename: 'ResponseError',
        type: 'SERVER_ERROR',
      };
    }

    return {
      __typename: 'RateProductResponseSuccess',
      result: {
        id: input.id,
        value: rating,
      },
    };
  } catch {
    return {
      __typename: 'ResponseError',
      type: 'SERVER_ERROR',
    };
  }
};
