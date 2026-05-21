import { graphql } from '../../../gql';

export const ProductListDoc = graphql(`
  query ProductList($input: ProductsInput!) {
    products(input: $input) {
      ... on ProductsResponseSuccess {
        result {
          id
          name
          price
          category
          imageUrl
          inStock
          rating
          reviewCount
        }
        total
        totalPages
        page
        pageSize
      }
      ... on ResponseError {
        __typename
      }
    }
  }
`);
