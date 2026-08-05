import { graphql } from '../../../gql';

export const AgentChatDoc = graphql(`
  query AgentChat {
    agentChat {
      ... on AgentChatResponseSuccess {
        result {
          id
          messages {
            id
            isMe
            content
            createdAt
          }
        }
      }
      ... on ResponseError {
        __typename
      }
    }
  }
`);

export const AgentChatUpdatesDoc = graphql(`
  subscription AgentChatUpdates {
    agentChatUpdates {
      ... on RunCompleted {
        seq
      }
      ... on TextDelta {
        seq
        text
      }
    }
  }
`);

export const SendAgentMessageDoc = graphql(`
  mutation SendAgentMessage($input: SendAgentChatMessageInput!) {
    sendAgentChatMessage(input: $input) {
      ... on SendAgentChatMessageResponseSuccess {
        result {
          id
          content
          createdAt
        }
      }
      ... on ResponseError {
        __typename
      }
    }
  }
`);
