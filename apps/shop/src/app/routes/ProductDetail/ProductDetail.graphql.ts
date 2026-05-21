import { graphql } from '../../../gql';

export const ProductDetailDoc = graphql(`
  query ProductDetail($id: ID!) {
    product(id: $id) {
      ... on ProductResponseSuccess {
        result {
          id
          name
          imageUrl
          inStock
          category
          reviewCount
          price
          description
          rating
        }
      }
    }
  }
`);
