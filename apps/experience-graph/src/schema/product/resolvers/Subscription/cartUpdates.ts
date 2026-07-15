import { graphql } from '../../../../gql';
import type { SubscriptionResolvers } from './../../../types.generated';

const ProductDoc = graphql(`
  query Product($id: ID!) {
    productsByIds(ids: [$id]) {
      result {
        ...ProductMapper
      }
    }
  }
`);

export const cartUpdates: NonNullable<SubscriptionResolvers['cartUpdates']> = {
  subscribe: async (_parent, _arg, { pubSub, userId }) => {
    if (!userId) {
      throw new Error('No logged in user');
    }
    return pubSub.subscribe('cartUpdates', userId);
  },
  resolve: async (parent: any, _arg: any, { execute }: any) => {
    const product = await execute(ProductDoc, { id: parent.addedProductId });

    const productResult = product.data?.productsByIds?.result[0];

    if (!productResult) {
      throw new Error(`Failed to load product ${parent.addedProductId}`);
    }

    return {
      update: `${parent.count} ${productResult.name} added to your cart!`,
    } as any;
  },
};
