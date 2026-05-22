import { graphql } from '../../gql';

graphql(`
  fragment CartItemMapper on CartItem {
    productId
    count
  }
`);
