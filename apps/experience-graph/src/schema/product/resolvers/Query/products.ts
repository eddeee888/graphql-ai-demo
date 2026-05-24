import { graphql } from '../../../../gql';
import { execute } from '../../../execute';
import type { QueryResolvers } from './../../../types.generated';

const ProductsDoc = graphql(`
  query Products(
    $filter: ProductListFilterInput!
    $pagination: PaginationInput!
  ) {
    productList(filter: $filter, pagination: $pagination) {
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
  const response = await execute(ProductsDoc, {
    filter: input,
    pagination,
  });

  if (!response.data || !response.data.productList) {
    return {
      __typename: 'ResponseError',
      type: 'SERVER_ERROR',
    };
  }

  return {
    __typename: 'ProductsResponseSuccess',
    result: response.data.productList.result,
    total: response.data.productList.pagination.total,
    totalPages: response.data.productList.pagination.totalPages,
    page: response.data.productList.pagination.page,
    pageSize: response.data.productList.pagination.pageSize,
  };
};
