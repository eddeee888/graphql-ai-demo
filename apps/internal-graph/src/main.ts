import { createServer } from 'node:http';
import { GraphQLError } from 'graphql';
import { createSchema, createYoga } from 'graphql-yoga';
import { typeDefs } from './schema/typeDefs.generated';
import { resolvers } from './schema/resolvers.generated';
import { ProductsService } from './data-services/products.service';
import { ProductRatingsService } from './data-services/productRatings.service';
import { CartsService } from './data-services/cart.service';

export interface ResolverContext {
  productsService: ProductsService;
  productRatingsService: ProductRatingsService;
  cartsService: CartsService;
}

const productsService = new ProductsService();
const productRatingsService = new ProductRatingsService();
const cartsService = new CartsService();

const server = createServer(
  createYoga<ResolverContext>({
    schema: createSchema<ResolverContext>({ typeDefs, resolvers }),
    context: ({ request }): ResolverContext => {
      const agentId = request.headers.get('x-agent-id');

      if (!agentId) {
        throw new GraphQLError('Unauthorized', {
          extensions: { http: { status: 401 } },
        });
      }
      return {
        productsService,
        productRatingsService,
        cartsService,
      };
    },
  }),
);

server.listen(3001, () => {
  console.info('Server is running on http://localhost:3001/graphql');
});
