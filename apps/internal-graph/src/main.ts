import { createServer } from 'node:http';
import { createSchema, createYoga } from 'graphql-yoga';
import { typeDefs } from './schema/typeDefs.generated';
import { resolvers } from './schema/resolvers.generated';
import { ProductsService } from './data-services/products.service';
import { ProductRatingsService } from './data-services/productRatings.service';
import { CartsService } from './data-services/cart.service';

export interface ResolverContext {
  currentUser: string;
  productsService: ProductsService;
  productRatingsService: ProductRatingsService;
  cartsService: CartsService;
}

const server = createServer(
  createYoga<ResolverContext>({
    schema: createSchema<ResolverContext>({ typeDefs, resolvers }),
    context: (): ResolverContext => ({
      currentUser: 'user-1', // FIXME: hardcoded user
      productsService: new ProductsService(),
      productRatingsService: new ProductRatingsService(),
      cartsService: new CartsService(),
    }),
  }),
);

server.listen(3001, () => {
  console.info('Server is running on http://localhost:3001/graphql');
});
