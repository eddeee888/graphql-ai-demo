/* eslint-disable */
import * as types from './graphql';



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
    "\n  fragment CartItemMapper on CartItem {\n    productId\n    count\n  }\n": typeof types.CartItemMapperFragmentDoc,
    "\n  fragment ProductMapper on Product {\n    id\n    name\n    description\n    price\n    category\n    imageUrl\n    stockCount\n    reviewCount\n    stockCount\n  }\n": typeof types.ProductMapperFragmentDoc,
    "\n  query CartItemProduct($id: ID!) {\n    productsByIds(ids: [$id]) {\n      result {\n        ...ProductMapper\n      }\n    }\n  }\n": typeof types.CartItemProductDocument,
    "\n  mutation AddItemToCart($input: AddItemToCartInput!) {\n    addItemToCart(input: $input) {\n      result {\n        id\n        items {\n          ...CartItemMapper\n        }\n      }\n    }\n  }\n": typeof types.AddItemToCartDocument,
    "\n  mutation ClearCart($userId: ID!) {\n    clearCart(input: { userId: $userId }) {\n      result {\n        id\n        items {\n          ...CartItemMapper\n        }\n      }\n    }\n  }\n": typeof types.ClearCartDocument,
    "\n  mutation RateProduct($input: RateProductInput!) {\n    rateProduct(input: $input) {\n      result {\n        id\n        average\n      }\n    }\n  }\n": typeof types.RateProductDocument,
    "\n  query ProductRating($id: ID!) {\n    productRatingByProductIds(ids: [$id]) {\n      result {\n        id\n        average\n      }\n    }\n  }\n": typeof types.ProductRatingDocument,
    "\n  query Cart($id: ID!) {\n    cart(id: $id) {\n      result {\n        id\n        items {\n          ...CartItemMapper\n        }\n      }\n    }\n  }\n": typeof types.CartDocument,
    "\n  query Product($id: ID!) {\n    productsByIds(ids: [$id]) {\n      result {\n        ...ProductMapper\n      }\n    }\n  }\n": typeof types.ProductDocument,
    "\n  query Products(\n    $filter: ProductListFilterInput!\n    $pagination: PaginationInput!\n  ) {\n    productList(filter: $filter, pagination: $pagination) {\n      result {\n        id\n        name\n        description\n        price\n        category\n        imageUrl\n        stockCount\n        reviewCount\n      }\n      pagination {\n        total\n        totalPages\n        page\n        pageSize\n      }\n    }\n  }\n": typeof types.ProductsDocument,
};
const documents: Documents = {
    "\n  fragment CartItemMapper on CartItem {\n    productId\n    count\n  }\n": types.CartItemMapperFragmentDoc,
    "\n  fragment ProductMapper on Product {\n    id\n    name\n    description\n    price\n    category\n    imageUrl\n    stockCount\n    reviewCount\n    stockCount\n  }\n": types.ProductMapperFragmentDoc,
    "\n  query CartItemProduct($id: ID!) {\n    productsByIds(ids: [$id]) {\n      result {\n        ...ProductMapper\n      }\n    }\n  }\n": types.CartItemProductDocument,
    "\n  mutation AddItemToCart($input: AddItemToCartInput!) {\n    addItemToCart(input: $input) {\n      result {\n        id\n        items {\n          ...CartItemMapper\n        }\n      }\n    }\n  }\n": types.AddItemToCartDocument,
    "\n  mutation ClearCart($userId: ID!) {\n    clearCart(input: { userId: $userId }) {\n      result {\n        id\n        items {\n          ...CartItemMapper\n        }\n      }\n    }\n  }\n": types.ClearCartDocument,
    "\n  mutation RateProduct($input: RateProductInput!) {\n    rateProduct(input: $input) {\n      result {\n        id\n        average\n      }\n    }\n  }\n": types.RateProductDocument,
    "\n  query ProductRating($id: ID!) {\n    productRatingByProductIds(ids: [$id]) {\n      result {\n        id\n        average\n      }\n    }\n  }\n": types.ProductRatingDocument,
    "\n  query Cart($id: ID!) {\n    cart(id: $id) {\n      result {\n        id\n        items {\n          ...CartItemMapper\n        }\n      }\n    }\n  }\n": types.CartDocument,
    "\n  query Product($id: ID!) {\n    productsByIds(ids: [$id]) {\n      result {\n        ...ProductMapper\n      }\n    }\n  }\n": types.ProductDocument,
    "\n  query Products(\n    $filter: ProductListFilterInput!\n    $pagination: PaginationInput!\n  ) {\n    productList(filter: $filter, pagination: $pagination) {\n      result {\n        id\n        name\n        description\n        price\n        category\n        imageUrl\n        stockCount\n        reviewCount\n      }\n      pagination {\n        total\n        totalPages\n        page\n        pageSize\n      }\n    }\n  }\n": types.ProductsDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment CartItemMapper on CartItem {\n    productId\n    count\n  }\n"): typeof import('./graphql').CartItemMapperFragmentDoc;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment ProductMapper on Product {\n    id\n    name\n    description\n    price\n    category\n    imageUrl\n    stockCount\n    reviewCount\n    stockCount\n  }\n"): typeof import('./graphql').ProductMapperFragmentDoc;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query CartItemProduct($id: ID!) {\n    productsByIds(ids: [$id]) {\n      result {\n        ...ProductMapper\n      }\n    }\n  }\n"): typeof import('./graphql').CartItemProductDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation AddItemToCart($input: AddItemToCartInput!) {\n    addItemToCart(input: $input) {\n      result {\n        id\n        items {\n          ...CartItemMapper\n        }\n      }\n    }\n  }\n"): typeof import('./graphql').AddItemToCartDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation ClearCart($userId: ID!) {\n    clearCart(input: { userId: $userId }) {\n      result {\n        id\n        items {\n          ...CartItemMapper\n        }\n      }\n    }\n  }\n"): typeof import('./graphql').ClearCartDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation RateProduct($input: RateProductInput!) {\n    rateProduct(input: $input) {\n      result {\n        id\n        average\n      }\n    }\n  }\n"): typeof import('./graphql').RateProductDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query ProductRating($id: ID!) {\n    productRatingByProductIds(ids: [$id]) {\n      result {\n        id\n        average\n      }\n    }\n  }\n"): typeof import('./graphql').ProductRatingDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Cart($id: ID!) {\n    cart(id: $id) {\n      result {\n        id\n        items {\n          ...CartItemMapper\n        }\n      }\n    }\n  }\n"): typeof import('./graphql').CartDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Product($id: ID!) {\n    productsByIds(ids: [$id]) {\n      result {\n        ...ProductMapper\n      }\n    }\n  }\n"): typeof import('./graphql').ProductDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Products(\n    $filter: ProductListFilterInput!\n    $pagination: PaginationInput!\n  ) {\n    productList(filter: $filter, pagination: $pagination) {\n      result {\n        id\n        name\n        description\n        price\n        category\n        imageUrl\n        stockCount\n        reviewCount\n      }\n      pagination {\n        total\n        totalPages\n        page\n        pageSize\n      }\n    }\n  }\n"): typeof import('./graphql').ProductsDocument;


export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}
