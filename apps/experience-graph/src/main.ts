import { createServer } from 'node:http';
import { createSchema, createYoga } from 'graphql-yoga';
import { typeDefs } from './schema/typeDefs.generated';
import { resolvers } from './schema/resolvers.generated';
import { ProductsService } from '@org/api-products';

export interface ResolverContext {
  productsService: ProductsService;
}

const server = createServer(
  createYoga<ResolverContext>({
    schema: createSchema<ResolverContext>({ typeDefs, resolvers }),
    context: () => ({
      productsService: new ProductsService(),
    }),
  }),
);

server.listen(3000, () => {
  console.info('Server is running on http://localhost:3000/graphql');
});
