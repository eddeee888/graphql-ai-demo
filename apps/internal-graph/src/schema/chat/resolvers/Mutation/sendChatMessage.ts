import type { MutationResolvers } from './../../../types.generated';
export const sendChatMessage: NonNullable<
  MutationResolvers['sendChatMessage']
> = async (_parent, { input }, { chatsService }) => {
  const message = chatsService.insertMessageToChat({
    chatId: input.chatId,
    messageContent: input.content,
    messageId: input.messageId,
    senderId: input.senderId,
  });

  return message;
};
