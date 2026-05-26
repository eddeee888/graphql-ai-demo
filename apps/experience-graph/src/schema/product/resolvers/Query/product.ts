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

  if (!product.data?.productsByIds?.result) {
    return {
      __typename: 'ResponseError',
      type: 'SERVER_ERROR',
    };
  }

  const productResult = product.data.productsByIds.result[0];

  return {
    __typename: 'ProductResponseSuccess',
    result: productResult,
  };
};
