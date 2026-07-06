import type { MutationResolvers } from './../../../types.generated';
export const clearCart: NonNullable<MutationResolvers['clearCart']> = async (
  _parent,
  { input },
  { cartsService },
) => {
  const result = cartsService.clearCart(input.userId);

  return {
    __typename: 'ClearCartResponse',
    result,
  };
};
