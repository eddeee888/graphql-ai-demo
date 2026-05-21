import type { QueryResolvers } from './../../../types.generated';
export const products: NonNullable<QueryResolvers['products']> = async (
  _parent,
  { input },
  { productsService },
) => {
  const result = productsService.getProducts(input);

  return {
    __typename: 'ProductsResponseSuccess',
    result: result.items,
    total: result.total,
    totalPages: result.totalPages,
    page: result.page,
    pageSize: result.pageSize,
  };
};
