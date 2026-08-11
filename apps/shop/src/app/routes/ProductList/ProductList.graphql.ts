import { graphql } from '../../../gql';

export const ProductListDoc = graphql(`
  query ProductList($input: ProductsInput!, $pagination: PaginationInput!) {
    products(input: $input, pagination: $pagination) {
      ... on ProductsResponseSuccess {
        result {
          id
          name
          price
          category
          imageUrl
          inStock
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
          reviewCount
        }
        pagination {
          total
          totalPages
        }
      }
      ... on ResponseError {
        __typename
      }
    }
  }
`);
