import type { QueryResolvers } from './../../../types.generated';
export const productsByIds: NonNullable<
  QueryResolvers['productsByIds']
> = async (_parent, { ids }, { productsService }) => {
  const result = productsService.getProductByIds(ids);

  return {
    __typename: 'ProductsByIdsResponse',
    result,
  };
};
