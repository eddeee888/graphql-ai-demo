import { graphql } from '../../../../gql';
import { execute } from '../../../execute';
import type { QueryResolvers } from './../../../types.generated';

const ProductsDoc = graphql(`
  query Products($input: ProductsInput!, $pagination: PaginationInput!) {
    products(input: $input, pagination: $pagination) {
      result {
        id
        name
        description
        price
        category
        imageUrl
        stockCount
        reviewCount
      }
      pagination {
        total
        totalPages
        page
        pageSize
      }
    }
  }
`);
export const products: NonNullable<QueryResolvers['products']> = async (
  _parent,
  { input, pagination },
) => {
  const result = await execute(ProductsDoc, {
    input,
    pagination,
  });

  if (!result.data) {
    return {
      __typename: 'ResponseError',
      type: 'SERVER_ERROR',
    };
  }

  return {
    __typename: 'ProductsResponseSuccess',
    result: result.data.products.result,
    total: result.data.products.pagination.total,
    totalPages: result.data.products.pagination.totalPages,
    page: result.data.products.pagination.page,
    pageSize: result.data.products.pagination.pageSize,
  };
};
