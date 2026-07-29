import { useMutation, useSubscription } from '@apollo/client/react';
import { AgentChatUpdatesDoc, StartAgentChatDoc } from './AgentChat.graphql';
import { Button } from '../../components/Button';
import { useState } from 'react';

export const AgentChat: React.FC = () => {
  const [message, setMessage] = useState<{
    state: 'initial' | 'in_progress' | 'completed';
    value: string[];
  }>({
    state: 'initial',
    value: [],
  });
  const [startAgentChat, startAgentChatResult] = useMutation(StartAgentChatDoc);
  useSubscription(AgentChatUpdatesDoc, {
    onData: ({ data }) => {
      if (data.data?.agentChatUpdates.__typename === 'RunCompleted') {
        setMessage((prev) => ({
          ...prev,
          state: 'completed',
        }));
      } else if (data.data?.agentChatUpdates.__typename === 'TextDelta') {
        const newValue = data.data?.agentChatUpdates.text;
        setMessage((prev) => ({
          state: 'in_progress',
          value: [...prev.value, newValue],
        }));
      }
    },
  });

  return (
    <div className="max-w-screen-sm m-auto p-5 border rounded mt-5">
      {message.value.join(' ')}

      <input
        value="Write a small analysis of 200 words, why GraphQL is great?"
        disabled
        className="bg-gray-400 w-full px-2 py-6 rounded"
      />
      <br />
      <br />
      <Button onClick={() => startAgentChat()}>
        {startAgentChatResult.loading ? 'Sending...' : 'Send'}
      </Button>
    </div>
  );
};
