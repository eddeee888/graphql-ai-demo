import { z } from 'zod';
import * as strands from '@strands-agents/sdk';
import express from 'express';

const PORT = process.env.PORT || 8080;
const AWS_BEARER_TOKEN_BEDROCK = process.env.AWS_BEARER_TOKEN_BEDROCK;

if (!AWS_BEARER_TOKEN_BEDROCK) {
  throw new Error('AWS_BEARER_TOKEN_BEDROCK is missing');
}

// Define a custom tool
const calculatorTool = strands.tool({
  name: 'calculator',
  description: 'Performs basic arithmetic operations',
  inputSchema: z.object({
    operation: z.enum(['add', 'subtract', 'multiply', 'divide']),
    a: z.number(),
    b: z.number(),
  }),
  callback: (input): number => {
    switch (input.operation) {
      case 'add':
        return input.a + input.b;
      case 'subtract':
        return input.a - input.b;
      case 'multiply':
        return input.a * input.b;
      case 'divide':
        return input.a / input.b;
    }
  },
});

// Configure the agent with Amazon Bedrock
const agent = new strands.Agent({
  model: new strands.BedrockModel({
    modelId: 'amazon.nova-lite-v1:0',
    region: 'ap-southeast-2', // Change to your preferred region
  }),
  tools: [calculatorTool],
});

const app = express();

// Health check endpoint (REQUIRED)
app.get('/ping', (_, res) =>
  res.json({
    status: 'Healthy',
    time_of_last_update: Math.floor(Date.now() / 1000),
  }),
);

// Agent invocation endpoint (REQUIRED)
// AWS sends binary payload, so we use express.raw middleware
app.post('/invocations', express.raw({ type: '*/*' }), async (req, res) => {
  // Decode binary payload from AWS SDK
  const prompt = new TextDecoder().decode(req.body);

  // Stream the response back as Server-Sent Events (SSE)
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.flushHeaders();

  const send = (data: unknown) => res.write(`${JSON.stringify(data)}\n\n`);

  try {
    let seq = 0;
    for await (const event of agent.stream(prompt)) {
      // Forward only the incremental text deltas to the client
      if (
        event.type === 'modelStreamUpdateEvent' &&
        event.event.type === 'modelContentBlockDeltaEvent' &&
        event.event.delta.type === 'textDelta'
      ) {
        send({ seq, text: event.event.delta.text });
        seq++;
      }
    }
    send({ seq, done: true });
  } catch (err) {
    console.error('Error processing request:', err);
    send({ error: 'Internal server error' });
  } finally {
    res.end();
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 AgentCore Runtime server listening on port ${PORT}`);
  console.log(`📍 Endpoints:`);
  console.log(`   POST http://0.0.0.0:${PORT}/invocations`);
  console.log(`   GET  http://0.0.0.0:${PORT}/ping`);
});
