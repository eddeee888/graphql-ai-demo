import { graphql } from '../../../../gql';
import { execute } from '../../../execute';
import type { MutationResolvers } from './../../../types.generated';

const RateProductDoc = graphql(`
  mutation RateProduct($input: RateProductInput!) {
    rateProduct(input: $input) {
      id
      value
    }
  }
`);

export const rateProduct: NonNullable<
  MutationResolvers['rateProduct']
> = async (_parent, { input }) => {
  try {
    const result = await execute(RateProductDoc, { input });

    const rating = result.data?.rateProduct?.value || 0;

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
