import type { QueryResolvers } from './../../../types.generated';
export const product: NonNullable<QueryResolvers['product']> = async (
  _parent,
  { id },
  { productsService },
) => {
  const result = productsService.getProductById(id);

  return result;
};
