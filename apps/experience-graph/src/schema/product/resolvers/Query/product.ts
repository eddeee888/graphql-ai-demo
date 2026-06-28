import { graphql } from '../../../../gql';
import type { QueryResolvers } from './../../../types.generated';

const ProductDoc = graphql(`
  query Product($id: ID!) {
    productsByIds(ids: [$id]) {
      result {
        ...ProductMapper
      }
    }
  }
`);

export const product: NonNullable<QueryResolvers['product']> = async (
  _parent,
  { id },
  { execute },
) => {
  const product = await execute(ProductDoc, { id });

  const productResult = product.data?.productsByIds?.result[0];

  if (!productResult) {
    return {
      __typename: 'ResponseError',
      type: 'SERVER_ERROR',
    };
  }

  return {
    __typename: 'ProductResponseSuccess',
    result: productResult,
  };
};
