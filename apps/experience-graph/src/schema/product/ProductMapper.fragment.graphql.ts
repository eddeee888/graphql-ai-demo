import { graphql } from '../../gql';

graphql(`
  fragment ProductMapper on Product {
    id
    name
    description
    price
    category
    imageUrl
    stockCount
    reviewCount
    stockCount
  }
`);
