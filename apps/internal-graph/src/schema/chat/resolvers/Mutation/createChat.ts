import type { MutationResolvers } from './../../../types.generated';
export const createChat: NonNullable<MutationResolvers['createChat']> = async (
  _parent,
  { input },
  { chatsService },
) => {
  const chat = chatsService.createChatIfNotExist({
    chatId: input.chatId,
    creatorId: input.creatorId,
  });

  return {
    id: chat.id,
    messages: {
      result: chat.messages,
    },
  };
};
