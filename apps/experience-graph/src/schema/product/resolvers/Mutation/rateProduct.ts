import { graphql } from '../../../../gql';
import { execute } from '../../../execute';
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
> = async (_parent, { input }) => {
  try {
    const response = await execute(RateProductDoc, { input });

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
