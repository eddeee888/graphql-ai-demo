export type { ProductMapperFragment as ProductMapper } from '../../gql/graphql';

export type CartItemMapper = {
  productId: string;
  count: number;
};
