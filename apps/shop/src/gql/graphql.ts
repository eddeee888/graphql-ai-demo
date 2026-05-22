/* eslint-disable */
/** Internal type. DO NOT USE DIRECTLY. */
type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** Internal type. DO NOT USE DIRECTLY. */
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type PaginationInput = {
  page?: number | null | undefined;
  pageSize?: number | null | undefined;
};

export type ProductsInput = {
  category?: string | null | undefined;
  inStock?: boolean | null | undefined;
  maxPrice?: number | null | undefined;
  minPrice?: number | null | undefined;
  searchTerm?: string | null | undefined;
};

export type RateProductInput = {
  id: string | number;
  rating: number;
};

export type CartQueryVariables = Exact<{
  id: string | number;
}>;


export type CartQuery = { cart:
    | { __typename: 'CartResponseSuccess', result: { __typename: 'Cart', id: string, items: Array<{ __typename: 'CartItem', count: number, product:
            | { __typename: 'CartItemProductResponseSuccess', result: { __typename: 'Product', id: string, name: string } }
            | { __typename: 'ResponseError' }
           }> } | null }
    | { __typename: 'ResponseError' }
   };

export type ProductDetailQueryVariables = Exact<{
  id: string | number;
}>;


export type ProductDetailQuery = { product:
    | { __typename: 'ProductResponseSuccess', result: { __typename: 'Product', id: string, name: string, imageUrl: string, inStock: boolean, category: string, reviewCount: number, price: number, description: string, rating:
          | { __typename: 'ProductRatingResponseSuccess', result: { __typename: 'ProductRating', id: string, value: number } }
          | { __typename: 'ResponseError' }
         } | null }
    | { __typename: 'ResponseError' }
   };

export type RateProductMutationVariables = Exact<{
  input: RateProductInput;
}>;


export type RateProductMutation = { rateProduct:
    | { __typename: 'RateProductResponseSuccess', result: { __typename: 'ProductRating', id: string, value: number } }
    | { __typename: 'ResponseError' }
   };

export type ProductListQueryVariables = Exact<{
  input: ProductsInput;
  pagination: PaginationInput;
}>;


export type ProductListQuery = { products:
    | { __typename: 'ProductsResponseSuccess', total: number, totalPages: number, page: number, pageSize: number, result: Array<{ __typename: 'Product', id: string, name: string, price: number, category: string, imageUrl: string, inStock: boolean, reviewCount: number, rating:
          | { __typename: 'ProductRatingResponseSuccess', result: { __typename: 'ProductRating', id: string, value: number } }
          | { __typename: 'ResponseError' }
         }> }
    | { __typename: 'ResponseError' }
   };


export const CartDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Cart"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cart"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CartResponseSuccess"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"result"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"product"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CartItemProductResponseSuccess"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"result"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ResponseError"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"count"}}]}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ResponseError"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}}]}}]}}]}}]} as unknown as DocumentNode<CartQuery, CartQueryVariables>;
export const ProductDetailDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ProductDetail"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"product"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ProductResponseSuccess"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"result"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"inStock"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"reviewCount"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"rating"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ProductRatingResponseSuccess"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"result"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ResponseError"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}}]}}]}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ResponseError"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}}]}}]}}]}}]} as unknown as DocumentNode<ProductDetailQuery, ProductDetailQueryVariables>;
export const RateProductDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RateProduct"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"RateProductInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"rateProduct"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"RateProductResponseSuccess"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"result"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ResponseError"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}}]}}]}}]}}]} as unknown as DocumentNode<RateProductMutation, RateProductMutationVariables>;
export const ProductListDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ProductList"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ProductsInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pagination"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PaginationInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"products"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}},{"kind":"Argument","name":{"kind":"Name","value":"pagination"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pagination"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ProductsResponseSuccess"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"result"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"inStock"}},{"kind":"Field","name":{"kind":"Name","value":"rating"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ProductRatingResponseSuccess"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"result"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ResponseError"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"reviewCount"}}]}},{"kind":"Field","name":{"kind":"Name","value":"total"}},{"kind":"Field","name":{"kind":"Name","value":"totalPages"}},{"kind":"Field","name":{"kind":"Name","value":"page"}},{"kind":"Field","name":{"kind":"Name","value":"pageSize"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ResponseError"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}}]}}]}}]}}]} as unknown as DocumentNode<ProductListQuery, ProductListQueryVariables>;