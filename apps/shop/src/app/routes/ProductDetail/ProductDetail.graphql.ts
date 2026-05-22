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
          rating {
            ... on ProductRatingResponseSuccess {
              result {
                id
                value
              }
            }
            ... on ResponseError {
              __typename
            }
          }
        }
      }
      ... on ResponseError {
        __typename
      }
    }
  }
`);

export const RateProductDoc = graphql(`
  mutation RateProduct($input: RateProductInput!) {
    rateProduct(input: $input) {
      ... on RateProductResponseSuccess {
        result {
          id
          value
        }
      }
      ... on ResponseError {
        __typename
      }
    }
  }
`);
