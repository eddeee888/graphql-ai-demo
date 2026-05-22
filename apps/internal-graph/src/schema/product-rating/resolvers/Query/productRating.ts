import type { QueryResolvers } from './../../../types.generated';
export const productRating: NonNullable<
  QueryResolvers['productRating']
> = async (_parent, { id }, { productRatingsService }) => {
  const ratingAvg = productRatingsService.getRatingAvg(id) || 0;
  return {
    id,
    value: ratingAvg,
  };
};
