import { graphql } from '../../gql';

graphql(`
  fragment ChatMessageMapper on ChatMessage {
    id
    senderId
    content
    createdAt
  }
`);
