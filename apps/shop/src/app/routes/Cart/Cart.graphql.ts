import { graphql } from '../../../gql';

export const CartDoc = graphql(`
  query Cart {
    cart {
      ... on CartResponseSuccess {
        result {
          ...CartFragment
        }
      }
      ... on ResponseError {
        __typename
      }
    }
  }
`);

export const ClearCartDoc = graphql(`
  mutation ClearCart {
    clearCart {
      ... on ClearCartResponseSuccess {
        result {
          ...CartFragment
        }
      }
    }
  }
`);

graphql(`
  fragment CartFragment on Cart {
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
`);
