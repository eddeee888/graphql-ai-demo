import { randomUUID } from 'node:crypto';
import { graphql } from '../../../../gql';
import type { MutationResolvers } from './../../../types.generated';

const SendAgentChatMessageDoc = graphql(`
  mutation SendAgentChatMessage($input: SendChatMessageInput!) {
    sendChatMessage(input: $input) {
      ...ChatMessageMapper
    }
  }
`);

export const sendAgentChatMessage: NonNullable<
  MutationResolvers['sendAgentChatMessage']
> = async (_parent, { input }, { pubSub, userId, execute }) => {
  if (!userId) {
    return {
      __typename: 'ResponseError',
      type: 'UNAUTHENTICATED',
    };
  }
  // Fire-and-forget: stream the agent's response into the pubSub topic that
  // `agentChatUpdates` is subscribed to, and return immediately so the client
  // can start receiving events over its subscription.
  void streamAgentChat({
    prompt: input.content,
    onTextDelta: async (params) => {
      pubSub.publish('agentChatUpdates', userId, {
        type: 'text-delta',
        seq: params.seq,
        text: params.text,
      });
    },
    onFinalResult: async (finalResult) => {
      await execute(SendAgentChatMessageDoc, {
        input: {
          chatId: userId,
          content: finalResult,
          messageId: randomUUID(),
          senderId: `${userId}-agent`,
        },
      });
    },
    onDone: (params) => {
      pubSub.publish('agentChatUpdates', userId, {
        type: 'run-completed',
        seq: params.seq,
      });
    },
  }).catch((err) => {
    console.error('Agent streaming failed:', err);
  });

  const sendChatMessageResult = await execute(SendAgentChatMessageDoc, {
    input: {
      chatId: userId,
      content: input.content,
      messageId: input.messageId,
      senderId: userId,
    },
  });

  const newMessage = sendChatMessageResult.data?.sendChatMessage;

  if (!newMessage) {
    return {
      __typename: 'ResponseError',
      type: 'SERVER_ERROR',
    };
  }

  return {
    __typename: 'SendAgentChatMessageResponseSuccess',
    result: newMessage,
  };
};

async function streamAgentChat({
  prompt,
  onTextDelta,
  onFinalResult,
  onDone,
}: {
  prompt: string;
  onTextDelta: Parameters<typeof handleEvent>['0']['onTextDelta'];
  onFinalResult: Parameters<typeof handleEvent>['0']['onFinalResult'];
  onDone: Parameters<typeof handleEvent>['0']['onDone'];
}): Promise<void> {
  const response = await fetch('http://localhost:8080/invocations', {
    method: 'POST',
    headers: { 'Content-Type': 'application/octet-stream' },
    body: prompt,
  });

  if (!response.ok || !response.body) {
    throw new Error(`Agent responded with ${response.status}`);
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = '';

  try {
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });

      // SSE events are separated by a blank line.
      let boundary: number;
      while ((boundary = buffer.indexOf('\n\n')) !== -1) {
        const rawEvent = buffer.slice(0, boundary);
        buffer = buffer.slice(boundary + 2);
        await handleEvent({
          data: rawEvent,
          onTextDelta,
          onFinalResult,
          onDone,
        });
      }
    }
  } finally {
    reader.releaseLock();
  }
}

async function handleEvent({
  data,
  onTextDelta,
  onFinalResult,
  onDone,
}: {
  data: string;
  onTextDelta: (params: { seq: number; text: string }) => void;
  onFinalResult: (result: string) => Promise<void>;
  onDone: (params: { seq: number }) => void;
}): Promise<void> {
  if (!data) {
    return;
  }

  const payload = JSON.parse(data) as
    | { seq: number; text: string }
    | { seq: number; finalResult: string }
    | { seq: number; done: true }
    | { error: string };

  if ('error' in payload) {
    throw new Error(payload.error);
  }

  if ('text' in payload) {
    onTextDelta({
      seq: payload.seq,
      text: payload.text,
    });
    return;
  }

  if ('finalResult' in payload) {
    await onFinalResult(payload.finalResult);
  }

  if ('done' in payload) {
    onDone({ seq: payload.seq });
  }
}
