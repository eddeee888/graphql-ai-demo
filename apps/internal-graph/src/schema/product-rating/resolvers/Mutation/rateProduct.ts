import type { MutationResolvers } from './../../../types.generated';
export const rateProduct: NonNullable<
  MutationResolvers['rateProduct']
> = async (_parent, { input }, { productRatingsService }) => {
  const newRatingAvg = productRatingsService.rateProduct({
    creatorUserId: input.userId,
    productId: input.productId,
    rating: input.rating,
  });

  return {
    __typename: 'RateProductResponse',
    result: {
      __typename: 'Product_Rating',
      id: input.productId,
      average: newRatingAvg,
    },
  };
};
