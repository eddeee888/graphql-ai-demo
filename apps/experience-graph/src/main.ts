import { createServer } from 'node:http';
import { createSchema, createYoga } from 'graphql-yoga';
import { typeDefs } from './schema/typeDefs.generated';
import { resolvers } from './schema/resolvers.generated';
import { createExecute } from './schema/execute';

export type ResolverContext = {
  execute: ReturnType<typeof createExecute>;
};

const server = createServer(
  createYoga<ResolverContext>({
    schema: createSchema<ResolverContext>({ typeDefs, resolvers }),
    context: ({ request }): ResolverContext => {
      const headers = { 'x-user-id': request.headers.get('x-user-id') };
      return { execute: createExecute(headers) };
    },
  }),
);

server.listen(3000, () => {
  console.info('Server is running on http://localhost:3000/graphql');
});
