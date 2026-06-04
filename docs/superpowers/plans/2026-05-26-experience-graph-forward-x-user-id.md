# Experience Graph — Forward x-user-id to Internal Graph

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Forward the `x-user-id` header from incoming `experience-graph` requests to every outgoing HTTP call to `internal-graph`.

**Architecture:** Replace the standalone `execute` function in `execute.ts` with a `createExecute` factory that accepts a headers map and returns a bound execute function with those headers merged into every fetch call. The Yoga context factory in `main.ts` creates an execute instance per request and places it on `ResolverContext`. All resolvers destructure `execute` from context instead of importing it directly.

**Tech Stack:** TypeScript, graphql-yoga, Node.js http, vitest

---

### Task 1: Create feature branch

- [ ] **Step 1: Create and switch to new branch**

```bash
git checkout -b feat/experience-graph-forward-x-user-id
```

---

### Task 2: Set up vitest for experience-graph

**Files:**
- Create: `apps/experience-graph/vitest.config.ts`
- Create: `apps/experience-graph/tsconfig.spec.json`
- Modify: `apps/experience-graph/tsconfig.json`

- [ ] **Step 1: Create `apps/experience-graph/vitest.config.ts`**

```ts
/// <reference types='vitest' />
import { defineConfig } from 'vite';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';

export default defineConfig({
  root: __dirname,
  cacheDir: '../../node_modules/.vite/apps/experience-graph',
  plugins: [nxViteTsPaths()],
  test: {
    name: '@org/experience-graph',
    watch: false,
    globals: true,
    environment: 'node',
    include: ['{src,tests}/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts}'],
    reporters: ['default'],
    coverage: {
      reportsDirectory: './test-output/vitest/coverage',
      provider: 'v8' as const,
      include: ['src/**/*.ts'],
    },
  },
});
```

- [ ] **Step 2: Create `apps/experience-graph/tsconfig.spec.json`**

```json
{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": {
    "outDir": "./out-tsc/vitest",
    "types": ["vitest/globals", "node"]
  },
  "include": [
    "vitest.config.ts",
    "src/**/*.test.ts",
    "src/**/*.spec.ts"
  ],
  "references": [
    { "path": "./tsconfig.app.json" }
  ]
}
```

- [ ] **Step 3: Add spec reference to `apps/experience-graph/tsconfig.json`**

Replace the file contents with:

```json
{
  "extends": "../../tsconfig.base.json",
  "files": [],
  "include": [],
  "references": [
    { "path": "./tsconfig.app.json" },
    { "path": "./tsconfig.spec.json" }
  ],
  "compilerOptions": {
    "esModuleInterop": true
  }
}
```

- [ ] **Step 4: Commit**

```bash
git add apps/experience-graph/vitest.config.ts apps/experience-graph/tsconfig.spec.json apps/experience-graph/tsconfig.json
git commit -m "chore(experience-graph): set up vitest"
```

---

### Task 3: Implement createExecute factory (TDD)

**Files:**
- Create: `apps/experience-graph/src/schema/execute.spec.ts`
- Modify: `apps/experience-graph/src/schema/execute.ts`

- [ ] **Step 1: Write failing test — create `apps/experience-graph/src/schema/execute.spec.ts`**

```ts
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createExecute } from './execute';

const mockQuery = 'query { __typename }' as any;

describe('createExecute', () => {
  beforeEach(() => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        json: vi.fn().mockResolvedValue({ data: { __typename: 'Query' } }),
      }),
    );
  });

  it('forwards non-null headers to internal-graph', async () => {
    const execute = createExecute({ 'x-user-id': 'user-1' });
    await execute(mockQuery);

    expect(fetch).toHaveBeenCalledWith(
      'http://localhost:3001/graphql/',
      expect.objectContaining({
        headers: expect.objectContaining({ 'x-user-id': 'user-1' }),
      }),
    );
  });

  it('omits null header values', async () => {
    const execute = createExecute({ 'x-user-id': null });
    await execute(mockQuery);

    const calledHeaders = vi.mocked(fetch).mock.calls[0][1]
      ?.headers as Record<string, string>;
    expect(calledHeaders).not.toHaveProperty('x-user-id');
  });

  it('throws when response is not ok', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({ ok: false }),
    );

    const execute = createExecute({ 'x-user-id': 'user-1' });
    await expect(execute(mockQuery)).rejects.toThrow('Network response was not ok');
  });
});
```

- [ ] **Step 2: Run test to confirm it fails**

```bash
pnpm vitest run --project @org/experience-graph
```

Expected: FAIL — `createExecute` is not exported from `execute.ts`

- [ ] **Step 3: Replace `apps/experience-graph/src/schema/execute.ts` with the factory**

```ts
import type { ExecutionResult } from 'graphql';
import type { TypedDocumentString } from '../gql/graphql';

export function createExecute(headers: Record<string, string | null>) {
  const forwardedHeaders = Object.fromEntries(
    Object.entries(headers).filter(
      (entry): entry is [string, string] => entry[1] !== null,
    ),
  );

  return async function execute<TResult, TVariables>(
    query: TypedDocumentString<TResult, TVariables>,
    ...[variables]: TVariables extends Record<string, never> ? [] : [TVariables]
  ): Promise<ExecutionResult<TResult>> {
    const response = await fetch('http://localhost:3001/graphql/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/graphql-response+json',
        ...forwardedHeaders,
      },
      body: JSON.stringify({
        query,
        variables,
      }),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    return response.json() as ExecutionResult<TResult>;
  };
}
```

- [ ] **Step 4: Run tests to confirm they pass**

```bash
pnpm vitest run --project @org/experience-graph
```

Expected: PASS — 3 tests pass

- [ ] **Step 5: Commit**

```bash
git add apps/experience-graph/src/schema/execute.ts apps/experience-graph/src/schema/execute.spec.ts
git commit -m "feat(experience-graph): replace execute with createExecute factory"
```

---

### Task 4: Update main.ts

**Files:**
- Modify: `apps/experience-graph/src/main.ts`

- [ ] **Step 1: Update `apps/experience-graph/src/main.ts`**

Replace the file contents with:

```ts
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
```

- [ ] **Step 2: Commit**

```bash
git add apps/experience-graph/src/main.ts
git commit -m "feat(experience-graph): add execute to ResolverContext via createExecute"
```

---

### Task 5: Update resolvers

**Files:**
- Modify: `apps/experience-graph/src/schema/product/resolvers/Query/products.ts`
- Modify: `apps/experience-graph/src/schema/product/resolvers/Query/product.ts`
- Modify: `apps/experience-graph/src/schema/product/resolvers/Query/cart.ts`
- Modify: `apps/experience-graph/src/schema/product/resolvers/Mutation/addItemToCart.ts`
- Modify: `apps/experience-graph/src/schema/product/resolvers/Mutation/clearCart.ts`
- Modify: `apps/experience-graph/src/schema/product/resolvers/Mutation/rateProduct.ts`

- [ ] **Step 1: Update `apps/experience-graph/src/schema/product/resolvers/Query/products.ts`**

```ts
import { graphql } from '../../../../gql';
import type { QueryResolvers } from './../../../types.generated';

const ProductsDoc = graphql(`
  query Products(
    $filter: ProductListFilterInput!
    $pagination: PaginationInput!
  ) {
    productList(filter: $filter, pagination: $pagination) {
      result {
        id
        name
        description
        price
        category
        imageUrl
        stockCount
        reviewCount
      }
      pagination {
        total
        totalPages
        page
        pageSize
      }
    }
  }
`);

export const products: NonNullable<QueryResolvers['products']> = async (
  _parent,
  { input, pagination },
  { execute },
) => {
  const response = await execute(ProductsDoc, {
    filter: input,
    pagination,
  });

  if (!response.data || !response.data.productList) {
    return {
      __typename: 'ResponseError',
      type: 'SERVER_ERROR',
    };
  }

  return {
    __typename: 'ProductsResponseSuccess',
    result: response.data.productList.result,
    total: response.data.productList.pagination.total,
    totalPages: response.data.productList.pagination.totalPages,
    page: response.data.productList.pagination.page,
    pageSize: response.data.productList.pagination.pageSize,
  };
};
```

- [ ] **Step 2: Update `apps/experience-graph/src/schema/product/resolvers/Query/product.ts`**

```ts
import { graphql } from '../../../../gql';
import type { QueryResolvers } from './../../../types.generated';

const ProductDoc = graphql(`
  query Product($id: ID!) {
    productsByIds(ids: [$id]) {
      result {
        ...ProductMapper
      }
    }
  }
`);

export const product: NonNullable<QueryResolvers['product']> = async (
  _parent,
  { id },
  { execute },
) => {
  const product = await execute(ProductDoc, { id });

  if (!product.data?.productsByIds?.result) {
    return {
      __typename: 'ResponseError',
      type: 'SERVER_ERROR',
    };
  }

  const productResult = product.data.productsByIds.result[0];

  return {
    __typename: 'ProductResponseSuccess',
    result: productResult,
  };
};
```

- [ ] **Step 3: Update `apps/experience-graph/src/schema/product/resolvers/Query/cart.ts`**

```ts
import { graphql } from '../../../../gql';
import type { QueryResolvers } from './../../../types.generated';

const CartDoc = graphql(`
  query Cart($id: ID!) {
    cart(id: $id) {
      result {
        id
        items {
          ...CartItemMapper
        }
      }
    }
  }
`);

export const cart: NonNullable<QueryResolvers['cart']> = async (
  _parent,
  { id },
  { execute },
) => {
  try {
    const response = await execute(CartDoc, { id });

    const result = response.data?.cart.result;
    if (!result) {
      return {
        __typename: 'ResponseError',
        type: 'SERVER_ERROR',
      };
    }

    return {
      __typename: 'CartResponseSuccess',
      result,
    };
  } catch {
    return {
      __typename: 'ResponseError',
      type: 'SERVER_ERROR',
    };
  }
};
```

- [ ] **Step 4: Update `apps/experience-graph/src/schema/product/resolvers/Mutation/addItemToCart.ts`**

```ts
import { graphql } from '../../../../gql';
import type { MutationResolvers } from './../../../types.generated';

const AddItemToCartDoc = graphql(`
  mutation AddItemToCart($input: AddItemToCartInput!) {
    addItemToCart(input: $input) {
      result {
        id
        items {
          ...CartItemMapper
        }
      }
    }
  }
`);

export const addItemToCart: NonNullable<
  MutationResolvers['addItemToCart']
> = async (_parent, { input }, { execute }) => {
  try {
    const response = await execute(AddItemToCartDoc, {
      input: {
        productId: input.productId,
        count: 1,
      },
    });

    if (!response.data) {
      return {
        __typename: 'ResponseError',
        type: 'SERVER_ERROR',
      };
    }

    return {
      __typename: 'AddItemToCartResponseSuccess',
      result: response.data.addItemToCart.result,
    };
  } catch {
    return {
      __typename: 'ResponseError',
      type: 'SERVER_ERROR',
    };
  }
};
```

- [ ] **Step 5: Update `apps/experience-graph/src/schema/product/resolvers/Mutation/clearCart.ts`**

```ts
import { graphql } from '../../../../gql';
import type { MutationResolvers } from './../../../types.generated';

const ClearCartDoc = graphql(`
  mutation ClearCart {
    clearCart {
      result {
        id
        items {
          ...CartItemMapper
        }
      }
    }
  }
`);

export const clearCart: NonNullable<
  MutationResolvers['clearCart']
> = async (_parent, _args, { execute }) => {
  try {
    const response = await execute(ClearCartDoc);

    if (!response.data) {
      return {
        __typename: 'ResponseError',
        type: 'SERVER_ERROR',
      };
    }

    return {
      __typename: 'ClearCartResponseSuccess',
      result: response.data.clearCart.result,
    };
  } catch {
    return {
      __typename: 'ResponseError',
      type: 'SERVER_ERROR',
    };
  }
};
```

- [ ] **Step 6: Update `apps/experience-graph/src/schema/product/resolvers/Mutation/rateProduct.ts`**

```ts
import { graphql } from '../../../../gql';
import type { MutationResolvers } from './../../../types.generated';

const RateProductDoc = graphql(`
  mutation RateProduct($input: RateProductInput!) {
    rateProduct(input: $input) {
      result {
        id
        value
      }
    }
  }
`);

export const rateProduct: NonNullable<
  MutationResolvers['rateProduct']
> = async (_parent, { input }, { execute }) => {
  try {
    const response = await execute(RateProductDoc, { input });

    const rating = response.data?.rateProduct?.result.value;
    if (rating === undefined) {
      return {
        __typename: 'ResponseError',
        type: 'SERVER_ERROR',
      };
    }

    return {
      __typename: 'RateProductResponseSuccess',
      result: {
        id: input.id,
        value: rating,
      },
    };
  } catch {
    return {
      __typename: 'ResponseError',
      type: 'SERVER_ERROR',
    };
  }
};
```

- [ ] **Step 7: Commit**

```bash
git add apps/experience-graph/src/schema/product/resolvers/Query/products.ts
git add apps/experience-graph/src/schema/product/resolvers/Query/product.ts
git add apps/experience-graph/src/schema/product/resolvers/Query/cart.ts
git add apps/experience-graph/src/schema/product/resolvers/Mutation/addItemToCart.ts
git add apps/experience-graph/src/schema/product/resolvers/Mutation/clearCart.ts
git add apps/experience-graph/src/schema/product/resolvers/Mutation/rateProduct.ts
git commit -m "feat(experience-graph): forward x-user-id to internal-graph via context execute"
```
