import type { QueryResolvers } from './../../../types.generated';
export const cart: NonNullable<QueryResolvers['cart']> = async (
  _parent,
  { id },
  { cartsService },
) => {
  const result = cartsService.getCart(id);
  return result;
};
