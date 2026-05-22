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
    "\n  mutation RateProduct($input: RateProductInput!) {\n    rateProduct(input: $input) {\n      id\n      value\n    }\n  }\n": typeof types.RateProductDocument,
    "\n  query ProductRating($id: ID!) {\n    productRating(id: $id) {\n      id\n      value\n    }\n  }\n": typeof types.ProductRatingDocument,
    "\n  query Product($id: ID!) {\n    product(id: $id) {\n      id\n      name\n      description\n      price\n      category\n      imageUrl\n      stockCount\n      reviewCount\n      stockCount\n    }\n  }\n": typeof types.ProductDocument,
    "\n  query Products($input: ProductsInput!, $pagination: PaginationInput!) {\n    products(input: $input, pagination: $pagination) {\n      result {\n        id\n        name\n        description\n        price\n        category\n        imageUrl\n        stockCount\n        reviewCount\n      }\n      pagination {\n        total\n        totalPages\n        page\n        pageSize\n      }\n    }\n  }\n": typeof types.ProductsDocument,
};
const documents: Documents = {
    "\n  mutation RateProduct($input: RateProductInput!) {\n    rateProduct(input: $input) {\n      id\n      value\n    }\n  }\n": types.RateProductDocument,
    "\n  query ProductRating($id: ID!) {\n    productRating(id: $id) {\n      id\n      value\n    }\n  }\n": types.ProductRatingDocument,
    "\n  query Product($id: ID!) {\n    product(id: $id) {\n      id\n      name\n      description\n      price\n      category\n      imageUrl\n      stockCount\n      reviewCount\n      stockCount\n    }\n  }\n": types.ProductDocument,
    "\n  query Products($input: ProductsInput!, $pagination: PaginationInput!) {\n    products(input: $input, pagination: $pagination) {\n      result {\n        id\n        name\n        description\n        price\n        category\n        imageUrl\n        stockCount\n        reviewCount\n      }\n      pagination {\n        total\n        totalPages\n        page\n        pageSize\n      }\n    }\n  }\n": types.ProductsDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation RateProduct($input: RateProductInput!) {\n    rateProduct(input: $input) {\n      id\n      value\n    }\n  }\n"): typeof import('./graphql').RateProductDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query ProductRating($id: ID!) {\n    productRating(id: $id) {\n      id\n      value\n    }\n  }\n"): typeof import('./graphql').ProductRatingDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Product($id: ID!) {\n    product(id: $id) {\n      id\n      name\n      description\n      price\n      category\n      imageUrl\n      stockCount\n      reviewCount\n      stockCount\n    }\n  }\n"): typeof import('./graphql').ProductDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Products($input: ProductsInput!, $pagination: PaginationInput!) {\n    products(input: $input, pagination: $pagination) {\n      result {\n        id\n        name\n        description\n        price\n        category\n        imageUrl\n        stockCount\n        reviewCount\n      }\n      pagination {\n        total\n        totalPages\n        page\n        pageSize\n      }\n    }\n  }\n"): typeof import('./graphql').ProductsDocument;


export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}
