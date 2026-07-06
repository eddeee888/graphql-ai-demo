import type { QueryResolvers } from './../../../types.generated';
export const productRatings: NonNullable<
  QueryResolvers['productRatings']
> = async (_parent, { filter, pagination }, { productRatingsService }) => {
  const response = productRatingsService.getRatings({ filter, pagination });

  return {
    ratings: response.result,
    pagination: response.pagination,
  };
};
