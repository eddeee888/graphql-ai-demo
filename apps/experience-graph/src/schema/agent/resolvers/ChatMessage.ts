import type { ChatMessageResolvers } from './../../types.generated';
export const ChatMessage: ChatMessageResolvers = {
  isMe: async ({ senderId }, _arg, { userId }) => {
    return senderId === userId;
  },
};
