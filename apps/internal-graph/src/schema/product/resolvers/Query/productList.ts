import type { QueryResolvers } from './../../../types.generated';
export const productList: NonNullable<QueryResolvers['productList']> = async (
  _parent,
  { filter, pagination },
  { productsService },
) => {
  const { result, pagination: resultPagination } =
    productsService.getProductList({ filter, pagination });

  return {
    __typename: 'ProductListResponse',
    result,
    pagination: resultPagination,
  };
};
