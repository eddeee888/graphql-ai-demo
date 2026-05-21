import { createServer } from 'node:http';
import { createSchema, createYoga } from 'graphql-yoga';

const yoga = createYoga({
  schema: createSchema({
    typeDefs: /* GraphQL */ `
      type Query {
        hello: String
      }
    `,
    resolvers: {
      Query: {
        hello: () => 'Hello from Yoga!',
      },
    },
  }),
});

const server = createServer(yoga);

server.listen(3000, () => {
  console.info('Server is running on http://localhost:3000/graphql');
});
