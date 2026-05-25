import type { MutationResolvers } from './../../../types.generated';
export const rateProduct: NonNullable<
  MutationResolvers['rateProduct']
> = async (_parent, { input }, { currentUser, productRatingsService }) => {
  const newRatingAvg = productRatingsService.rateProduct({
    creatorActorId: currentUser.id,
    productId: input.id,
    rating: input.rating,
  });

  return {
    __typename: 'RateProductResponse',
    result: {
      __typename: 'ProductRating',
      id: input.id,
      value: newRatingAvg,
    },
  };
};
