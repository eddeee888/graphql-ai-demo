import { graphql } from '../../../../gql';
import type { QueryResolvers } from './../../../types.generated';

const CreateAgentChatDoc = graphql(`
  mutation CreateAgentChat($input: CreateChatInput!) {
    createChat(input: $input) {
      id
      messages {
        result {
          ...ChatMessageMapper
        }
      }
    }
  }
`);

export const agentChat: NonNullable<QueryResolvers['agentChat']> = async (
  _parent,
  _arg,
  { userId, execute },
) => {
  if (!userId) {
    return {
      __typename: 'ResponseError',
      type: 'UNAUTHENTICATED',
    };
  }

  const chatResponse = await execute(CreateAgentChatDoc, {
    input: { chatId: userId, creatorId: userId },
  });

  const chat = chatResponse.data?.createChat;

  if (!chat) {
    return {
      __typename: 'ResponseError',
      type: 'SERVER_ERROR',
    };
  }

  return {
    __typename: 'AgentChatResponseSuccess',
    result: {
      id: chat.id,
      messages: chat.messages.result,
    },
  };
};
