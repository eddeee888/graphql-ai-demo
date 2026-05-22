import { graphql } from '../../../../gql';
import { execute } from '../../../execute';
import type { QueryResolvers } from './../../../types.generated';

const ProductDoc = graphql(`
  query Product($id: ID!) {
    product(id: $id) {
      id
      name
      description
      price
      category
      imageUrl
      stockCount
      reviewCount
      stockCount
    }
  }
`);

export const product: NonNullable<QueryResolvers['product']> = async (
  _parent,
  { id },
) => {
  const product = await execute(ProductDoc, { id });
  return {
    __typename: 'ProductResponseSuccess',
    result: product.data?.product,
  };
};
