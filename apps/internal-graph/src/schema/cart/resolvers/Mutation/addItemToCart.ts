import type { MutationResolvers } from './../../../types.generated';
export const addItemToCart: NonNullable<
  MutationResolvers['addItemToCart']
> = async (_parent, { input }, { currentUser, cartsService }) => {
  const cart = cartsService.addItemToCart({
    userId: currentUser,
    productId: input.productId,
    count: input.count,
  });

  return cart;
};
