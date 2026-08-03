/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "\n  subscription CartUpdates {\n    cartUpdates {\n      update\n    }\n  }\n": typeof types.CartUpdatesDocument,
    "\n  query AgentChat {\n    agentChat {\n      ... on AgentChatResponseSuccess {\n        result {\n          id\n          messages {\n            id\n            isMe\n            content\n            createdAt\n          }\n        }\n      }\n      ... on ResponseError {\n        __typename\n      }\n    }\n  }\n": typeof types.AgentChatDocument,
    "\n  subscription AgentChatUpdates {\n    agentChatUpdates {\n      ... on RunCompleted {\n        seq\n      }\n      ... on TextDelta {\n        seq\n        text\n      }\n    }\n  }\n": typeof types.AgentChatUpdatesDocument,
    "\n  mutation SendAgentMessage($input: SendAgentChatMessageInput!) {\n    sendAgentChatMessage(input: $input) {\n      ... on SendAgentChatMessageResponseSuccess {\n        result {\n          id\n          content\n          createdAt\n        }\n      }\n      ... on ResponseError {\n        __typename\n      }\n    }\n  }\n": typeof types.SendAgentMessageDocument,
    "\n  query Cart {\n    cart {\n      ... on CartResponseSuccess {\n        result {\n          ...CartFragment\n        }\n      }\n      ... on ResponseError {\n        __typename\n      }\n    }\n  }\n": typeof types.CartDocument,
    "\n  mutation ClearCart {\n    clearCart {\n      ... on ClearCartResponseSuccess {\n        result {\n          ...CartFragment\n        }\n      }\n    }\n  }\n": typeof types.ClearCartDocument,
    "\n  fragment CartFragment on Cart {\n    id\n    items {\n      product {\n        ... on CartItemProductResponseSuccess {\n          result {\n            id\n            name\n          }\n        }\n        ... on ResponseError {\n          __typename\n        }\n      }\n      count\n    }\n  }\n": typeof types.CartFragmentFragmentDoc,
    "\n  query ProductDetail($id: ID!) {\n    product(id: $id) {\n      ... on ProductResponseSuccess {\n        result {\n          id\n          name\n          imageUrl\n          inStock\n          category\n          reviewCount\n          price\n          description\n          rating {\n            ... on ProductRatingResponseSuccess {\n              result {\n                id\n                value\n              }\n            }\n            ... on ResponseError {\n              __typename\n            }\n          }\n        }\n      }\n      ... on ResponseError {\n        __typename\n      }\n    }\n  }\n": typeof types.ProductDetailDocument,
    "\n  mutation RateProduct($input: RateProductInput!) {\n    rateProduct(input: $input) {\n      ... on RateProductResponseSuccess {\n        result {\n          id\n          value\n        }\n      }\n      ... on ResponseError {\n        __typename\n      }\n    }\n  }\n": typeof types.RateProductDocument,
    "\n  mutation AddItemToCard($input: AddItemToCartInput!) {\n    addItemToCart(input: $input) {\n      ... on AddItemToCartResponseSuccess {\n        __typename\n      }\n      ... on ResponseError {\n        __typename\n      }\n    }\n  }\n": typeof types.AddItemToCardDocument,
    "\n  query ProductList($input: ProductsInput!, $pagination: PaginationInput!) {\n    products(input: $input, pagination: $pagination) {\n      ... on ProductsResponseSuccess {\n        result {\n          id\n          name\n          price\n          category\n          imageUrl\n          inStock\n          rating {\n            ... on ProductRatingResponseSuccess {\n              result {\n                id\n                value\n              }\n            }\n            ... on ResponseError {\n              __typename\n            }\n          }\n          reviewCount\n        }\n        total\n        totalPages\n        page\n        pageSize\n      }\n      ... on ResponseError {\n        __typename\n      }\n    }\n  }\n": typeof types.ProductListDocument,
};
const documents: Documents = {
    "\n  subscription CartUpdates {\n    cartUpdates {\n      update\n    }\n  }\n": types.CartUpdatesDocument,
    "\n  query AgentChat {\n    agentChat {\n      ... on AgentChatResponseSuccess {\n        result {\n          id\n          messages {\n            id\n            isMe\n            content\n            createdAt\n          }\n        }\n      }\n      ... on ResponseError {\n        __typename\n      }\n    }\n  }\n": types.AgentChatDocument,
    "\n  subscription AgentChatUpdates {\n    agentChatUpdates {\n      ... on RunCompleted {\n        seq\n      }\n      ... on TextDelta {\n        seq\n        text\n      }\n    }\n  }\n": types.AgentChatUpdatesDocument,
    "\n  mutation SendAgentMessage($input: SendAgentChatMessageInput!) {\n    sendAgentChatMessage(input: $input) {\n      ... on SendAgentChatMessageResponseSuccess {\n        result {\n          id\n          content\n          createdAt\n        }\n      }\n      ... on ResponseError {\n        __typename\n      }\n    }\n  }\n": types.SendAgentMessageDocument,
    "\n  query Cart {\n    cart {\n      ... on CartResponseSuccess {\n        result {\n          ...CartFragment\n        }\n      }\n      ... on ResponseError {\n        __typename\n      }\n    }\n  }\n": types.CartDocument,
    "\n  mutation ClearCart {\n    clearCart {\n      ... on ClearCartResponseSuccess {\n        result {\n          ...CartFragment\n        }\n      }\n    }\n  }\n": types.ClearCartDocument,
    "\n  fragment CartFragment on Cart {\n    id\n    items {\n      product {\n        ... on CartItemProductResponseSuccess {\n          result {\n            id\n            name\n          }\n        }\n        ... on ResponseError {\n          __typename\n        }\n      }\n      count\n    }\n  }\n": types.CartFragmentFragmentDoc,
    "\n  query ProductDetail($id: ID!) {\n    product(id: $id) {\n      ... on ProductResponseSuccess {\n        result {\n          id\n          name\n          imageUrl\n          inStock\n          category\n          reviewCount\n          price\n          description\n          rating {\n            ... on ProductRatingResponseSuccess {\n              result {\n                id\n                value\n              }\n            }\n            ... on ResponseError {\n              __typename\n            }\n          }\n        }\n      }\n      ... on ResponseError {\n        __typename\n      }\n    }\n  }\n": types.ProductDetailDocument,
    "\n  mutation RateProduct($input: RateProductInput!) {\n    rateProduct(input: $input) {\n      ... on RateProductResponseSuccess {\n        result {\n          id\n          value\n        }\n      }\n      ... on ResponseError {\n        __typename\n      }\n    }\n  }\n": types.RateProductDocument,
    "\n  mutation AddItemToCard($input: AddItemToCartInput!) {\n    addItemToCart(input: $input) {\n      ... on AddItemToCartResponseSuccess {\n        __typename\n      }\n      ... on ResponseError {\n        __typename\n      }\n    }\n  }\n": types.AddItemToCardDocument,
    "\n  query ProductList($input: ProductsInput!, $pagination: PaginationInput!) {\n    products(input: $input, pagination: $pagination) {\n      ... on ProductsResponseSuccess {\n        result {\n          id\n          name\n          price\n          category\n          imageUrl\n          inStock\n          rating {\n            ... on ProductRatingResponseSuccess {\n              result {\n                id\n                value\n              }\n            }\n            ... on ResponseError {\n              __typename\n            }\n          }\n          reviewCount\n        }\n        total\n        totalPages\n        page\n        pageSize\n      }\n      ... on ResponseError {\n        __typename\n      }\n    }\n  }\n": types.ProductListDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  subscription CartUpdates {\n    cartUpdates {\n      update\n    }\n  }\n"): (typeof documents)["\n  subscription CartUpdates {\n    cartUpdates {\n      update\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query AgentChat {\n    agentChat {\n      ... on AgentChatResponseSuccess {\n        result {\n          id\n          messages {\n            id\n            isMe\n            content\n            createdAt\n          }\n        }\n      }\n      ... on ResponseError {\n        __typename\n      }\n    }\n  }\n"): (typeof documents)["\n  query AgentChat {\n    agentChat {\n      ... on AgentChatResponseSuccess {\n        result {\n          id\n          messages {\n            id\n            isMe\n            content\n            createdAt\n          }\n        }\n      }\n      ... on ResponseError {\n        __typename\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  subscription AgentChatUpdates {\n    agentChatUpdates {\n      ... on RunCompleted {\n        seq\n      }\n      ... on TextDelta {\n        seq\n        text\n      }\n    }\n  }\n"): (typeof documents)["\n  subscription AgentChatUpdates {\n    agentChatUpdates {\n      ... on RunCompleted {\n        seq\n      }\n      ... on TextDelta {\n        seq\n        text\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation SendAgentMessage($input: SendAgentChatMessageInput!) {\n    sendAgentChatMessage(input: $input) {\n      ... on SendAgentChatMessageResponseSuccess {\n        result {\n          id\n          content\n          createdAt\n        }\n      }\n      ... on ResponseError {\n        __typename\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation SendAgentMessage($input: SendAgentChatMessageInput!) {\n    sendAgentChatMessage(input: $input) {\n      ... on SendAgentChatMessageResponseSuccess {\n        result {\n          id\n          content\n          createdAt\n        }\n      }\n      ... on ResponseError {\n        __typename\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Cart {\n    cart {\n      ... on CartResponseSuccess {\n        result {\n          ...CartFragment\n        }\n      }\n      ... on ResponseError {\n        __typename\n      }\n    }\n  }\n"): (typeof documents)["\n  query Cart {\n    cart {\n      ... on CartResponseSuccess {\n        result {\n          ...CartFragment\n        }\n      }\n      ... on ResponseError {\n        __typename\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation ClearCart {\n    clearCart {\n      ... on ClearCartResponseSuccess {\n        result {\n          ...CartFragment\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation ClearCart {\n    clearCart {\n      ... on ClearCartResponseSuccess {\n        result {\n          ...CartFragment\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment CartFragment on Cart {\n    id\n    items {\n      product {\n        ... on CartItemProductResponseSuccess {\n          result {\n            id\n            name\n          }\n        }\n        ... on ResponseError {\n          __typename\n        }\n      }\n      count\n    }\n  }\n"): (typeof documents)["\n  fragment CartFragment on Cart {\n    id\n    items {\n      product {\n        ... on CartItemProductResponseSuccess {\n          result {\n            id\n            name\n          }\n        }\n        ... on ResponseError {\n          __typename\n        }\n      }\n      count\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query ProductDetail($id: ID!) {\n    product(id: $id) {\n      ... on ProductResponseSuccess {\n        result {\n          id\n          name\n          imageUrl\n          inStock\n          category\n          reviewCount\n          price\n          description\n          rating {\n            ... on ProductRatingResponseSuccess {\n              result {\n                id\n                value\n              }\n            }\n            ... on ResponseError {\n              __typename\n            }\n          }\n        }\n      }\n      ... on ResponseError {\n        __typename\n      }\n    }\n  }\n"): (typeof documents)["\n  query ProductDetail($id: ID!) {\n    product(id: $id) {\n      ... on ProductResponseSuccess {\n        result {\n          id\n          name\n          imageUrl\n          inStock\n          category\n          reviewCount\n          price\n          description\n          rating {\n            ... on ProductRatingResponseSuccess {\n              result {\n                id\n                value\n              }\n            }\n            ... on ResponseError {\n              __typename\n            }\n          }\n        }\n      }\n      ... on ResponseError {\n        __typename\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation RateProduct($input: RateProductInput!) {\n    rateProduct(input: $input) {\n      ... on RateProductResponseSuccess {\n        result {\n          id\n          value\n        }\n      }\n      ... on ResponseError {\n        __typename\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation RateProduct($input: RateProductInput!) {\n    rateProduct(input: $input) {\n      ... on RateProductResponseSuccess {\n        result {\n          id\n          value\n        }\n      }\n      ... on ResponseError {\n        __typename\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation AddItemToCard($input: AddItemToCartInput!) {\n    addItemToCart(input: $input) {\n      ... on AddItemToCartResponseSuccess {\n        __typename\n      }\n      ... on ResponseError {\n        __typename\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation AddItemToCard($input: AddItemToCartInput!) {\n    addItemToCart(input: $input) {\n      ... on AddItemToCartResponseSuccess {\n        __typename\n      }\n      ... on ResponseError {\n        __typename\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query ProductList($input: ProductsInput!, $pagination: PaginationInput!) {\n    products(input: $input, pagination: $pagination) {\n      ... on ProductsResponseSuccess {\n        result {\n          id\n          name\n          price\n          category\n          imageUrl\n          inStock\n          rating {\n            ... on ProductRatingResponseSuccess {\n              result {\n                id\n                value\n              }\n            }\n            ... on ResponseError {\n              __typename\n            }\n          }\n          reviewCount\n        }\n        total\n        totalPages\n        page\n        pageSize\n      }\n      ... on ResponseError {\n        __typename\n      }\n    }\n  }\n"): (typeof documents)["\n  query ProductList($input: ProductsInput!, $pagination: PaginationInput!) {\n    products(input: $input, pagination: $pagination) {\n      ... on ProductsResponseSuccess {\n        result {\n          id\n          name\n          price\n          category\n          imageUrl\n          inStock\n          rating {\n            ... on ProductRatingResponseSuccess {\n              result {\n                id\n                value\n              }\n            }\n            ... on ResponseError {\n              __typename\n            }\n          }\n          reviewCount\n        }\n        total\n        totalPages\n        page\n        pageSize\n      }\n      ... on ResponseError {\n        __typename\n      }\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;