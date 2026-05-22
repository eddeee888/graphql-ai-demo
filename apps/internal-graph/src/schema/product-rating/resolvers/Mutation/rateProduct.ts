import type { MutationResolvers } from './../../../types.generated';
export const rateProduct: NonNullable<
  MutationResolvers['rateProduct']
> = async (_parent, { input }, { currentUser, productRatingsService }) => {
  const newRatingAvg = productRatingsService.rate({
    creatorActorId: currentUser,
    productId: input.id,
    rating: input.rating,
  });

  return {
    __typename: 'ProductRating',
    id: input.id,
    value: newRatingAvg || 0,
  };
};
