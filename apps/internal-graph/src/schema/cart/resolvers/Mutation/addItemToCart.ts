import type { MutationResolvers } from './../../../types.generated';
export const addItemToCart: NonNullable<
  MutationResolvers['addItemToCart']
> = async (_parent, { input }, { cartsService }) => {
  const result = cartsService.addItemToCart({
    userId: input.userId,
    productId: input.productId,
    count: input.count,
  });

  return {
    __typename: 'AddItemToCartResponse',
    result,
  };
};
