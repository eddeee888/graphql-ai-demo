import type { QueryResolvers } from './../../../types.generated';
export const productRatingByProductIds: NonNullable<
  QueryResolvers['productRatingByProductIds']
> = async (_parent, { ids }, { productRatingsService }) => {
  const result = productRatingsService.getRatingAvgByProductIds(ids);

  return {
    __typename: 'ProductRatingByProductIdsResponse',
    result: ids.map((id, index) => {
      return {
        __typename: 'Product_Rating',
        id,
        average: result[index],
      };
    }),
  };
};
