import type { MutationResolvers } from './../../../types.generated';
export const rateProduct: NonNullable<
  MutationResolvers['rateProduct']
> = async (_parent, { input }, { productRatingsService }) => {
  const newRatingAvg = productRatingsService.rateProduct({
    creatorActorId: input.userId,
    productId: input.productId,
    rating: input.rating,
  });

  return {
    __typename: 'RateProductResponse',
    result: {
      __typename: 'ProductRating',
      id: input.productId,
      value: newRatingAvg,
    },
  };
};
