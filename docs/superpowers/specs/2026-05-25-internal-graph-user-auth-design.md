# Internal Graph — User Service & Auth Design

**Date:** 2026-05-25  
**Scope:** `apps/internal-graph`

## Overview

Add a `UsersService` with a fixed in-memory user store and wire up header-based authentication in the GraphQL Yoga context factory. Requests without a valid `x-user-id` header are rejected with HTTP 401.

## Data Model

```ts
interface DatabaseUser {
  id: string;
  name: string;
  role: 'user' | 'admin';
}
```

Two hardcoded users:

| ID       | Name  | Role    |
|----------|-------|---------|
| `user-1` | Alice | `user`  |
| `user-2` | Bob   | `admin` |

## UsersService

New file: `apps/internal-graph/src/data-services/users.service.ts`

Follows the same pattern as `ProductsService` — in-memory `Record<string, DatabaseUser>` with a single lookup method:

```ts
class UsersService {
  getUserById(id: string): DatabaseUser | null
}
```

Returns `null` for any unknown ID.

## Auth — Context Factory

**File:** `apps/internal-graph/src/main.ts`

Changes:
- `ResolverContext.currentUser` type changes from `string` to `DatabaseUser` (exported from `users.service.ts`)
- A single shared `UsersService` instance is created outside the context factory (same pattern as other services)
- The context factory receives `{ request }` from Yoga, reads the `x-user-id` header, and calls `usersService.getUserById()`
- If the header is missing or the ID is unknown, throws `GraphQLError('Unauthorized', { extensions: { http: { status: 401 } } })`
- On success, sets `currentUser` to the resolved `DatabaseUser`

```ts
context: ({ request }): ResolverContext => {
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
}
```

## Resolver Updates

Three existing resolvers pass `currentUser` directly to service calls as a user ID string. Each is updated to use `currentUser.id`:

| File | Change |
|------|--------|
| `schema/cart/resolvers/Mutation/clearCart.ts` | `cartsService.clearCart(currentUser)` → `cartsService.clearCart(currentUser.id)` |
| `schema/cart/resolvers/Mutation/addItemToCart.ts` | `userId: currentUser` → `userId: currentUser.id` |
| `schema/product-rating/resolvers/Mutation/rateProduct.ts` | `creatorActorId: currentUser` → `creatorActorId: currentUser.id` |

## Files Changed

| File | Action |
|------|--------|
| `apps/internal-graph/src/data-services/users.service.ts` | Create |
| `apps/internal-graph/src/main.ts` | Update |
| `apps/internal-graph/src/schema/cart/resolvers/Mutation/clearCart.ts` | Update |
| `apps/internal-graph/src/schema/cart/resolvers/Mutation/addItemToCart.ts` | Update |
| `apps/internal-graph/src/schema/product-rating/resolvers/Mutation/rateProduct.ts` | Update |

## Out of Scope

- No GraphQL `User` type or `me` query exposed in the schema
- No JWT or session-based auth — header is trusted as-is
- No role-based access control on individual resolvers
