import type { SubscriptionResolvers } from './../../../types.generated';
export const agentChatUpdates: NonNullable<
  SubscriptionResolvers['agentChatUpdates']
> = {
  subscribe: async (_parent, _arg, { userId, pubSub }) => {
    if (!userId) {
      throw new Error('No logged in user');
    }
    return pubSub.subscribe('agentChatUpdates', userId);
  },
  resolve: (
    parent:
      | {
          type: 'chat-message';
          id: string;
          content: string;
          senderId: string;
          createdAt: string;
        }
      | { type: 'text-delta'; seq: number; text: string }
      | { type: 'run-completed'; seq: number },
  ) => {
    if (parent.type === 'text-delta') {
      return {
        __typename: 'AgentEventTextDelta',
        seq: parent.seq,
        text: parent.text,
      };
    }

    if (parent.type === 'run-completed') {
      return {
        __typename: 'AgentEventRunCompleted',
        seq: parent.seq,
      };
    }

    return {
      __typename: 'ChatMessage',
      id: parent.id,
      senderId: parent.senderId,
      content: parent.content,
      createdAt: parent.createdAt,
    } as any;
  },
};
