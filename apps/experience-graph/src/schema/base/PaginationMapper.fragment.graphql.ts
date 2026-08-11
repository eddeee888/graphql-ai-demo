import { graphql } from '../../gql';

graphql(`
  fragment PaginationMapper on PaginationResult {
    total
    page
    pageSize
    totalPages
  }
`);
