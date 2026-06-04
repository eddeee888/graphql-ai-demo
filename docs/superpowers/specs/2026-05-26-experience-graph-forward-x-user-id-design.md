# Experience Graph — Forward x-user-id to Internal Graph

**Date:** 2026-05-26
**Scope:** `apps/experience-graph`

## Overview

`experience-graph` receives requests with an `x-user-id` header and must forward it to every outgoing call it makes to `internal-graph`. `internal-graph` rejects requests without a valid `x-user-id` (HTTP 401), so without forwarding, all resolver calls to `internal-graph` fail for authenticated users.

`experience-graph` does not validate the header itself — it forwards the raw value as-is and lets `internal-graph` handle rejection.

## Approach

Use an **execute factory on ResolverContext**. The Yoga context factory creates a bound `execute` function with the incoming headers baked in, and places it on the context. Resolvers destructure `execute` from context instead of importing it directly. The call signatures at each call site are unchanged.

## File Changes

### `apps/experience-graph/src/schema/execute.ts`

Replace the current exported `execute` function with an exported `createExecute` factory:

```ts
export function createExecute(headers: Record<string, string | null>) {
  return async function execute<TResult, TVariables>(query: TypedDocumentString<TResult, TVariables>, ...[variables]: TVariables extends Record<string, never> ? [] : [TVariables]): Promise<ExecutionResult<TResult>> {
    const forwardedHeaders: Record<string, string> = Object.fromEntries(Object.entries(headers).filter((entry): entry is [string, string] => entry[1] !== null));

    const response = await fetch('http://localhost:3001/graphql/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/graphql-response+json',
        ...forwardedHeaders,
      },
      body: JSON.stringify({ query, variables }),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    return response.json() as ExecutionResult<TResult>;
  };
}
```

### `apps/experience-graph/src/main.ts`

Update `ResolverContext` and the Yoga context factory:

```ts
import { createExecute } from './schema/execute';

export type ResolverContext = {
  execute: ReturnType<typeof createExecute>;
};

// in createYoga:
context: ({ request }): ResolverContext => {
  const headers = { 'x-user-id': request.headers.get('x-user-id') };
  return { execute: createExecute(headers) };
},
```

### Resolvers (6 files)

Each resolver drops the `import { execute }` line and destructures `execute` from the third context argument. The call to `execute(...)` is unchanged.

| File                                                 | Change                                                     |
| ---------------------------------------------------- | ---------------------------------------------------------- |
| `schema/product/resolvers/Query/products.ts`         | Add `{ execute }` to context arg                           |
| `schema/product/resolvers/Query/product.ts`          | Add `{ execute }` to context arg                           |
| `schema/product/resolvers/Query/cart.ts`             | Add `{ execute }` to context arg                           |
| `schema/product/resolvers/Mutation/addItemToCart.ts` | Add `{ execute }` to context arg                           |
| `schema/product/resolvers/Mutation/clearCart.ts`     | Change `async ()` to `async (_parent, _args, { execute })` |
| `schema/product/resolvers/Mutation/rateProduct.ts`   | Add `{ execute }` to context arg                           |

## Data Flow

```
Client request (x-user-id: user-1)
  → experience-graph Yoga context factory
      → createExecute({ 'x-user-id': 'user-1' })
          → ResolverContext.execute
              → resolver calls context.execute(Doc, vars)
                  → fetch to internal-graph with x-user-id: user-1 header
```

## Error Handling

No changes to error handling. If `x-user-id` is absent or invalid, `internal-graph` returns HTTP 401 and the existing `throw new Error('Network response was not ok')` path in `execute` handles it, surfacing as a `SERVER_ERROR` response at the experience-graph level.

## Out of Scope

- No validation of `x-user-id` in `experience-graph`
- No changes to `internal-graph`
- No additional headers forwarded beyond `x-user-id`
