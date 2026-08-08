import { createServer } from 'node:http';
import { useGraphQLSSE } from '@graphql-yoga/plugin-graphql-sse';
import { useMCP } from '@graphql-hive/plugin-mcp';
import { Logger } from '@graphql-hive/logger';
import { useDisableIntrospection } from '@envelop/disable-introspection';
import { createPubSub, createSchema, createYoga } from 'graphql-yoga';
import { typeDefs } from './schema/typeDefs.generated';
import { resolvers } from './schema/resolvers.generated';
import { createExecute } from './createExecute';

export type ResolverContext = {
  execute: ReturnType<typeof createExecute>;
  userId: string | null;
  pubSub: typeof pubSub;
};

const pubSub = createPubSub<{
  cartUpdates: [
    userId: string,
    update: { userId: string; addedProductId: string; count: number },
  ];
  agentChatUpdates: [
    userId: string,
    update:
      | {
          type: 'chat-message';
          id: string;
          content: string;
          senderId: string;
          createdAt: string | Date;
        }
      | { type: 'text-delta'; seq: number; text: string }
      | { type: 'run-completed'; seq: number },
  ];
}>();

const server = createServer(
  createYoga<ResolverContext>({
    schema: createSchema<ResolverContext>({ typeDefs, resolvers }),
    context: ({ request }): ResolverContext => {
      const userId = request.headers.get('x-user-id');
      const headers = { 'x-agent-id': 'experience-graph' };
      return { execute: createExecute(headers), pubSub, userId };
    },

    plugins: [
      useDisableIntrospection(),
      useGraphQLSSE(),
      useMCP(
        { log: new Logger() },
        {
          name: 'experience-graph-mcp',
          operationsPath: './apps/experience-graph/src/mcp/operations',
        },
      ),
    ],
  }),
);

server.listen(3000, () => {
  console.info('Server is running on http://localhost:3000/graphql');
});
