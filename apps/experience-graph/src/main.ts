import { createServer } from 'node:http';
import { useGraphQLSSE } from '@graphql-yoga/plugin-graphql-sse';
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
    update: { userId: string; addedProductId: string },
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
    plugins: [useGraphQLSSE()],
  }),
);

server.listen(3000, () => {
  console.info('Server is running on http://localhost:3000/graphql');
});
