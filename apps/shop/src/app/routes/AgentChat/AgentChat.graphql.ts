import { graphql } from '../../../gql';

export const StartAgentChatDoc = graphql(`
  mutation StartAgentChat {
    startAgentChat
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
