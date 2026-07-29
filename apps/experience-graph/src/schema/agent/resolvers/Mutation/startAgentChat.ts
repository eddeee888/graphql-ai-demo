import { ResolverContext } from '../../../../main';
import type { MutationResolvers } from './../../../types.generated';

export const startAgentChat: NonNullable<
  MutationResolvers['startAgentChat']
> = async (_parent, _arg, { userId, pubSub }) => {
  if (!userId) {
    return false;
  }

  // Fire-and-forget: stream the agent's response into the pubSub topic that
  // `agentChatUpdates` is subscribed to, and return immediately so the client
  // can start receiving events over its subscription.
  void streamAgentChat(userId, pubSub).catch((err) => {
    console.error('Agent streaming failed:', err);
  });

  return true;
};

async function streamAgentChat(
  userId: string,
  pubSub: ResolverContext['pubSub'],
): Promise<void> {
  const prompt = 'Write a small analysis of 200 words, why GraphQL is great?';

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
        handleEvent(rawEvent, userId, pubSub);
      }
    }
  } finally {
    reader.releaseLock();
  }
}

function handleEvent(
  data: string,
  userId: string,
  pubSub: ResolverContext['pubSub'],
): void {
  if (!data) {
    return;
  }

  const payload = JSON.parse(data) as
    | { seq: number; text: string }
    | { seq: number; done: true }
    | { error: string };

  if ('error' in payload) {
    throw new Error(payload.error);
  }

  if ('text' in payload) {
    pubSub.publish('agentChatUpdates', userId, {
      type: 'text-delta',
      seq: payload.seq,
      text: payload.text,
    });
    return;
  }

  if ('done' in payload) {
    pubSub.publish('agentChatUpdates', userId, {
      type: 'run-completed',
      seq: payload.seq,
    });
  }
}
