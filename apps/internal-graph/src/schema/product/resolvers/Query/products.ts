import type { QueryResolvers } from './../../../types.generated';
export const products: NonNullable<QueryResolvers['products']> = async (
  _parent,
  { input, pagination },
  { productsService },
) => {
  const response = productsService.getProducts({
    filter: input,
    pagination,
  });

  return {
    result: response.result,
    pagination: response.pagination,
  };
};
