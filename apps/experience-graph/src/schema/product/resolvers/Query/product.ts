import type { QueryResolvers } from './../../../types.generated';

export const product: NonNullable<QueryResolvers['product']> = async (
  _parent,
  { id },
  { productsService },
) => {
  const product = productsService.getProductById(id);
  return {
    __typename: 'ProductResponseSuccess',
    result: product,
  };
};
