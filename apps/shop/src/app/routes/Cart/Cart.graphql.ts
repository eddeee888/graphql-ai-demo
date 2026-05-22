import { graphql } from '../../../gql';

export const CartDoc = graphql(`
  query Cart($id: ID!) {
    cart(id: $id) {
      ... on CartResponseSuccess {
        result {
          id
          items {
            product {
              ... on CartItemProductResponseSuccess {
                result {
                  id
                  name
                }
              }
              ... on ResponseError {
                __typename
              }
            }
            count
          }
        }
      }
      ... on ResponseError {
        __typename
      }
    }
  }
`);
