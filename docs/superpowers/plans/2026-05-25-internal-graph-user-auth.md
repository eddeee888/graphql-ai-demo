# Internal Graph — User Service & Auth Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a `UsersService` with two hardcoded users and wire up `x-user-id` header-based authentication in the graphql-yoga context factory.

**Architecture:** A new `UsersService` follows the same in-memory data pattern as `ProductsService`. The context factory in `main.ts` reads the `x-user-id` header, looks up the user, and throws a 401 `GraphQLError` if missing or unknown. `ResolverContext.currentUser` is promoted from `string` to `DatabaseUser`. Three resolvers that pass `currentUser` directly to service calls are updated to use `currentUser.id`.

**Tech Stack:** TypeScript, graphql-yoga, Node.js http

---

### Task 1: Create UsersService

**Files:**

- Create: `apps/internal-graph/src/data-services/users.service.ts`

- [x] **Step 1: Create the file**

```ts
interface DatabaseUser {
  id: string;
  name: string;
  role: 'user' | 'admin';
}

const data: Record<string, DatabaseUser> = {
  'user-1': { id: 'user-1', name: 'Alice', role: 'user' },
  'user-2': { id: 'user-2', name: 'Bob', role: 'admin' },
};

export class UsersService {
  private data: Record<string, DatabaseUser>;
  constructor() {
    this.data = data;
  }

  getUserById(id: string): DatabaseUser | null {
    return this.data[id] ?? null;
  }
}

export type { DatabaseUser };
```

- [x] **Step 2: Commit**

```bash
git add apps/internal-graph/src/data-services/users.service.ts
git commit -m "feat(internal-graph): add UsersService with in-memory user store"
```

---

### Task 2: Wire up auth in main.ts

**Files:**

- Modify: `apps/internal-graph/src/main.ts`

- [x] **Step 1: Update main.ts**

Replace the entire file with:

```ts
import { createServer } from 'node:http';
import { GraphQLError } from 'graphql';
import { createSchema, createYoga } from 'graphql-yoga';
import { typeDefs } from './schema/typeDefs.generated';
import { resolvers } from './schema/resolvers.generated';
import { ProductsService } from './data-services/products.service';
import { ProductRatingsService } from './data-services/productRatings.service';
import { CartsService } from './data-services/cart.service';
import { UsersService, type DatabaseUser } from './data-services/users.service';

export interface ResolverContext {
  currentUser: DatabaseUser;
  productsService: ProductsService;
  productRatingsService: ProductRatingsService;
  cartsService: CartsService;
}

const server = createServer(
  createYoga<ResolverContext>({
    schema: createSchema<ResolverContext>({ typeDefs, resolvers }),
    context: ({ request }): ResolverContext => {
      const usersService = new UsersService();
      const productsService = new ProductsService();
      const productRatingsService = new ProductRatingsService();
      const cartsService = new CartsService();

      const userId = request.headers.get('x-user-id');
      const user = usersService.getUserById(userId ?? '');
      if (!user) {
        throw new GraphQLError('Unauthorized', {
          extensions: { http: { status: 401 } },
        });
      }
      return {
        currentUser: user,
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
```

- [x] **Step 2: Commit**

```bash
git add apps/internal-graph/src/main.ts
git commit -m "feat(internal-graph): authenticate requests via x-user-id header"
```

---

### Task 3: Update resolvers to use currentUser.id

**Files:**

- Modify: `apps/internal-graph/src/schema/cart/resolvers/Mutation/clearCart.ts`
- Modify: `apps/internal-graph/src/schema/cart/resolvers/Mutation/addItemToCart.ts`
- Modify: `apps/internal-graph/src/schema/product-rating/resolvers/Mutation/rateProduct.ts`

- [x] **Step 1: Update clearCart.ts**

```ts
import type { MutationResolvers } from './../../../types.generated';
export const clearCart: NonNullable<MutationResolvers['clearCart']> = async (_parent, _arg, { currentUser, cartsService }) => {
  const result = cartsService.clearCart(currentUser.id);

  return {
    __typename: 'ClearCartResponse',
    result,
  };
};
```

- [x] **Step 2: Update addItemToCart.ts**

```ts
import type { MutationResolvers } from './../../../types.generated';
export const addItemToCart: NonNullable<MutationResolvers['addItemToCart']> = async (_parent, { input }, { currentUser, cartsService }) => {
  const result = cartsService.addItemToCart({
    userId: currentUser.id,
    productId: input.productId,
    count: input.count,
  });

  return {
    __typename: 'AddItemToCartResponse',
    result,
  };
};
```

- [x] **Step 3: Update rateProduct.ts**

```ts
import type { MutationResolvers } from './../../../types.generated';
export const rateProduct: NonNullable<MutationResolvers['rateProduct']> = async (_parent, { input }, { currentUser, productRatingsService }) => {
  const newRatingAvg = productRatingsService.rateProduct({
    creatorActorId: currentUser.id,
    productId: input.id,
    rating: input.rating,
  });

  return {
    __typename: 'RateProductResponse',
    result: {
      __typename: 'ProductRating',
      id: input.id,
      value: newRatingAvg,
    },
  };
};
```

- [x] **Step 4: Commit**

```bash
git add apps/internal-graph/src/schema/cart/resolvers/Mutation/clearCart.ts
git add apps/internal-graph/src/schema/cart/resolvers/Mutation/addItemToCart.ts
git add apps/internal-graph/src/schema/product-rating/resolvers/Mutation/rateProduct.ts
git commit -m "fix(internal-graph): use currentUser.id in resolver service calls"
```
