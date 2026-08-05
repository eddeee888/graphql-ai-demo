import { useMutation, useQuery, useSubscription } from '@apollo/client/react';
import { v4 as uuid } from 'uuid';
import {
  AgentChatDoc,
  AgentChatUpdatesDoc,
  SendAgentMessageDoc,
} from './AgentChat.graphql';
import { Button } from '../../components/Button';
import { useState } from 'react';
import { LoadingSpinner } from '../../components/LoadingSpinner';
import { ErrorMessage } from '../../components/ErrorMessage';

export const AgentChat: React.FC = () => {
  const [userMessage, setUserMessage] = useState('');

  const [agentMessage, setAgentMessage] = useState<{
    state: 'initial' | 'in_progress' | 'completed';
    value: string[];
  }>({
    state: 'initial',
    value: [],
  });

  const { loading, error, data } = useQuery(AgentChatDoc);

  useSubscription(AgentChatUpdatesDoc, {
    onData: ({ data }) => {
      if (data.data?.agentChatUpdates.__typename === 'RunCompleted') {
        setAgentMessage((prev) => ({
          ...prev,
          state: 'completed',
        }));
      } else if (data.data?.agentChatUpdates.__typename === 'TextDelta') {
        const newValue = data.data?.agentChatUpdates.text;
        setAgentMessage((prev) => ({
          state: 'in_progress',
          value: [...prev.value, newValue],
        }));
      }
    },
  });

  const [sendMessage, sendMessageResult] = useMutation(SendAgentMessageDoc);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error || !data || data.agentChat.__typename === 'ResponseError') {
    return <ErrorMessage />;
  }

  const agentChat = data.agentChat.result;

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();

        const newMessageId = uuid();
        setUserMessage('');
        sendMessage({
          variables: {
            input: {
              messageId: newMessageId,
              content: userMessage,
            },
          },
          optimisticResponse: () => {
            return {
              sendAgentChatMessage: {
                __typename: 'SendAgentChatMessageResponseSuccess',
                result: {
                  __typename: 'ChatMessage',
                  id: 'mock-message-id',
                  content: userMessage,
                  createdAt: new Date().toISOString(),
                },
              },
            };
          },
          update(cache, result) {
            if (
              !result.data ||
              result.data.sendAgentChatMessage.__typename === 'ResponseError'
            ) {
              return;
            }
            const newMessage = result.data.sendAgentChatMessage.result;

            const chatCacheId = cache.identify({
              __typename: 'AgentChat',
              id: agentChat.id,
            });
            if (!chatCacheId) {
              return;
            }

            cache.modify({
              id: chatCacheId,
              fields: {
                messages(existing = [], { readField, toReference }) {
                  const alreadyPresent = existing.some(
                    (ref: any) => readField('id', ref) === newMessage.id,
                  );
                  if (alreadyPresent) {
                    return existing;
                  }

                  const newMessageRef = toReference(newMessage, true);
                  return [...existing, newMessageRef];
                },
              },
            });
          },
        });
      }}
    >
      <div className="max-w-screen-sm m-auto p-5 border rounded mt-5">
        <div className="flex flex-col gap-2">
          {agentChat.messages.map((message) => (
            <div
              key={message.id}
              className={`
                max-w-[75%] px-4 py-2 rounded-2xl text-sm leading-relaxed
                ${message.isMe ? 'bg-blue-500 text-white rounded-br-sm self-end' : 'bg-white text-gray-900 border border-gray-200 rounded-bl-sm self-start'}
              `}
            >
              {message.content}
            </div>
          ))}
          {agentMessage.value.length > 0 && (
            <div
              className={`
                max-w-[75%] px-4 py-2 rounded-2xl text-sm leading-relaxed
              bg-white text-gray-900 border border-gray-200 rounded-bl-sm self-start
              `}
            >
              {agentMessage.value.join(' ')}
            </div>
          )}
        </div>

        <div className="flex mt-2 gap-2 ">
          <input
            value={userMessage}
            onChange={(e) => setUserMessage(e.target.value)}
            className="w-full border-2 px-2 py-2 rounded"
          />

          <Button type="submit">
            {sendMessageResult.loading ? 'Sending...' : 'Send'}
          </Button>
        </div>
      </div>
    </form>
  );
};
