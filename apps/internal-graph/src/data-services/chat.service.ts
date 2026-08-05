interface DatabaseChat {
  id: string;
  messages: DatabaseChatMessage[];
  creatorId: string;
}

interface DatabaseChatMessage {
  id: string;
  content: string;
  senderId: string;
  createdAt: Date;
}

const data: Record<string, DatabaseChat> = {};

export class ChatsService {
  private data: Record<string, DatabaseChat>;
  constructor() {
    this.data = data;
  }

  createChatIfNotExist({
    chatId,
    creatorId,
  }: {
    chatId: string;
    creatorId: string;
  }): DatabaseChat {
    if (!this.data[chatId]) {
      this.data[chatId] = {
        id: chatId,
        messages: [],
        creatorId,
      };
    }

    return this.data[chatId];
  }

  insertMessageToChat({
    chatId,
    messageId,
    messageContent,
    senderId,
  }: {
    chatId: string;
    messageId: string;
    messageContent: string;
    senderId: string;
  }): DatabaseChatMessage {
    if (!this.data[chatId]) {
      throw new Error('Chat does not exist');
    }

    const newMessage: DatabaseChatMessage = {
      id: messageId,
      content: messageContent,
      senderId,
      createdAt: new Date(),
    };

    this.data[chatId].messages.push(newMessage);

    return newMessage;
  }
}
