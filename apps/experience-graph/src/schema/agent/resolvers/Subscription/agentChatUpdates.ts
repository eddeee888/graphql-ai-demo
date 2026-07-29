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
  resolve: async (
    parent:
      | { type: 'text-delta'; seq: number; text: string }
      | { type: 'run-completed'; seq: number },
  ) => {
    if (parent.type === 'text-delta') {
      return {
        __typename: 'TextDelta',
        seq: parent.seq,
        text: parent.text,
      };
    }

    return {
      __typename: 'RunCompleted',
      seq: parent.seq,
    } as any;
  },
};
