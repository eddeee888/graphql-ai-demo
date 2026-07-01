import { graphql } from '../../gql';

export const CartUpdatesDoc = graphql(`
  subscription CartUpdates {
    cartUpdates {
      update
    }
  }
`);
