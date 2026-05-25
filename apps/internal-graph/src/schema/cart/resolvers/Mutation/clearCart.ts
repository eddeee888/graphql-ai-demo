import type { MutationResolvers } from './../../../types.generated';
export const clearCart: NonNullable<MutationResolvers['clearCart']> = async (
  _parent,
  _arg,
  { currentUser, cartsService },
) => {
  const result = cartsService.clearCart(currentUser.id);

  return {
    __typename: 'ClearCartResponse',
    result,
  };
};
