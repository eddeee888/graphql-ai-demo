import { graphql } from '../../../../gql';
import type { QueryResolvers } from './../../../types.generated';

export const products: NonNullable<QueryResolvers['products']> = async (
  _parent,
  { input, pagination },
  { execute },
) => {
  const response = await execute(
    graphql(`
      query Products(
        $filter: ProductListFilterInput!
        $pagination: PaginationInput!
      ) {
        productList(filter: $filter, pagination: $pagination) {
          result {
            ...ProductMapper
          }
          pagination {
            ...PaginationMapper
          }
        }
      }
    `),
    { filter: input, pagination },
  );

  if (!response.data || !response.data.productList) {
    return {
      __typename: 'ResponseError',
      type: 'SERVER_ERROR',
    };
  }

  return {
    __typename: 'ProductsResponseSuccess',
    result: response.data.productList.result,
    pagination: response.data.productList.pagination,
  };
};
