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
      ... on ChatMessage {
        id
        isMe
        content
        createdAt
      }
      ... on AgentEventRunCompleted {
        seq
      }
      ... on AgentEventTextDelta {
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
          isMe
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
