/* eslint-disable */
/** Internal type. DO NOT USE DIRECTLY. */
type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** Internal type. DO NOT USE DIRECTLY. */
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
import { DocumentTypeDecoration } from '@graphql-typed-document-node/core';
export type AddItemToCartInput = {
  count: number;
  productId: string | number;
  userId: string | number;
};

export type CreateChatInput = {
  chatId: string | number;
  creatorId: string | number;
};

/** Standard pagination input */
export type PaginationInput = {
  page?: number | null | undefined;
  pageSize?: number | null | undefined;
};

export type ProductListFilterInput = {
  categories?: Array<string> | null | undefined;
  inStock?: boolean | null | undefined;
  maxPrice?: number | null | undefined;
  minPrice?: number | null | undefined;
  searchTerm?: string | null | undefined;
};

export type RateProductInput = {
  productId: string | number;
  rating: number;
  userId: string | number;
};

export type SendChatMessageInput = {
  chatId: string | number;
  content: string;
  messageId: string | number;
  senderId: string | number;
};

export type ChatMessageMapperFragment = { id: string, senderId: string, content: string, createdAt: string };

export type SendAgentChatMessageMutationVariables = Exact<{
  input: SendChatMessageInput;
}>;


export type SendAgentChatMessageMutation = { sendChatMessage: { id: string, senderId: string, content: string, createdAt: string } };

export type CreateAgentChatMutationVariables = Exact<{
  input: CreateChatInput;
}>;


export type CreateAgentChatMutation = { createChat: { id: string, messages: { result: Array<{ id: string, senderId: string, content: string, createdAt: string }> } } };

export type PaginationMapperFragment = { total: number, page: number, pageSize: number, totalPages: number };

export type CartItemMapperFragment = { productId: string, count: number };

export type ProductMapperFragment = { id: string, name: string, description: string, price: number, category: string, imageUrl: string, stockCount: number, reviewCount: number };

export type CartItemProductQueryVariables = Exact<{
  id: string | number;
}>;


export type CartItemProductQuery = { productsByIds: { result: Array<{ id: string, name: string, description: string, price: number, category: string, imageUrl: string, stockCount: number, reviewCount: number } | null> } };

export type AddItemToCartMutationVariables = Exact<{
  input: AddItemToCartInput;
}>;


export type AddItemToCartMutation = { addItemToCart: { result: { id: string, items: Array<{ productId: string, count: number }> } } };

export type ClearCartMutationVariables = Exact<{
  userId: string | number;
}>;


export type ClearCartMutation = { clearCart: { result: { id: string, items: Array<{ productId: string, count: number }> } } };

export type RateProductMutationVariables = Exact<{
  input: RateProductInput;
}>;


export type RateProductMutation = { rateProduct: { result: { id: string, average: number } } };

export type ProductRatingQueryVariables = Exact<{
  id: string | number;
}>;


export type ProductRatingQuery = { productRatingByProductIds: { result: Array<{ id: string, average: number }> } };

export type CartQueryVariables = Exact<{
  id: string | number;
}>;


export type CartQuery = { cart: { result: { id: string, items: Array<{ productId: string, count: number }> } } };

export type ProductQueryVariables = Exact<{
  id: string | number;
}>;


export type ProductQuery = { productsByIds: { result: Array<{ id: string, name: string, description: string, price: number, category: string, imageUrl: string, stockCount: number, reviewCount: number } | null> } };

export type ProductsQueryVariables = Exact<{
  filter: ProductListFilterInput;
  pagination: PaginationInput;
}>;


export type ProductsQuery = { productList: { result: Array<{ id: string, name: string, description: string, price: number, category: string, imageUrl: string, stockCount: number, reviewCount: number }>, pagination: { total: number, page: number, pageSize: number, totalPages: number } } };

export class TypedDocumentString<TResult, TVariables>
  extends String
  implements DocumentTypeDecoration<TResult, TVariables>
{
  __apiType?: NonNullable<DocumentTypeDecoration<TResult, TVariables>['__apiType']>;
  private value: string;
  public __meta__?: Record<string, any> | undefined;

  constructor(value: string, __meta__?: Record<string, any> | undefined) {
    super(value);
    this.value = value;
    this.__meta__ = __meta__;
  }

  override toString(): string & DocumentTypeDecoration<TResult, TVariables> {
    return this.value;
  }
}
export const ChatMessageMapperFragmentDoc = new TypedDocumentString(`
    fragment ChatMessageMapper on ChatMessage {
  id
  senderId
  content
  createdAt
}
    `, {"fragmentName":"ChatMessageMapper"}) as unknown as TypedDocumentString<ChatMessageMapperFragment, unknown>;
export const PaginationMapperFragmentDoc = new TypedDocumentString(`
    fragment PaginationMapper on PaginationResult {
  total
  page
  pageSize
  totalPages
}
    `, {"fragmentName":"PaginationMapper"}) as unknown as TypedDocumentString<PaginationMapperFragment, unknown>;
export const CartItemMapperFragmentDoc = new TypedDocumentString(`
    fragment CartItemMapper on CartItem {
  productId
  count
}
    `, {"fragmentName":"CartItemMapper"}) as unknown as TypedDocumentString<CartItemMapperFragment, unknown>;
export const ProductMapperFragmentDoc = new TypedDocumentString(`
    fragment ProductMapper on Product {
  id
  name
  description
  price
  category
  imageUrl
  stockCount
  reviewCount
  stockCount
}
    `, {"fragmentName":"ProductMapper"}) as unknown as TypedDocumentString<ProductMapperFragment, unknown>;
export const SendAgentChatMessageDocument = new TypedDocumentString(`
    mutation SendAgentChatMessage($input: SendChatMessageInput!) {
  sendChatMessage(input: $input) {
    ...ChatMessageMapper
  }
}
    fragment ChatMessageMapper on ChatMessage {
  id
  senderId
  content
  createdAt
}`) as unknown as TypedDocumentString<SendAgentChatMessageMutation, SendAgentChatMessageMutationVariables>;
export const CreateAgentChatDocument = new TypedDocumentString(`
    mutation CreateAgentChat($input: CreateChatInput!) {
  createChat(input: $input) {
    id
    messages {
      result {
        ...ChatMessageMapper
      }
    }
  }
}
    fragment ChatMessageMapper on ChatMessage {
  id
  senderId
  content
  createdAt
}`) as unknown as TypedDocumentString<CreateAgentChatMutation, CreateAgentChatMutationVariables>;
export const CartItemProductDocument = new TypedDocumentString(`
    query CartItemProduct($id: ID!) {
  productsByIds(ids: [$id]) {
    result {
      ...ProductMapper
    }
  }
}
    fragment ProductMapper on Product {
  id
  name
  description
  price
  category
  imageUrl
  stockCount
  reviewCount
  stockCount
}`) as unknown as TypedDocumentString<CartItemProductQuery, CartItemProductQueryVariables>;
export const AddItemToCartDocument = new TypedDocumentString(`
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
    fragment CartItemMapper on CartItem {
  productId
  count
}`) as unknown as TypedDocumentString<AddItemToCartMutation, AddItemToCartMutationVariables>;
export const ClearCartDocument = new TypedDocumentString(`
    mutation ClearCart($userId: ID!) {
  clearCart(input: {userId: $userId}) {
    result {
      id
      items {
        ...CartItemMapper
      }
    }
  }
}
    fragment CartItemMapper on CartItem {
  productId
  count
}`) as unknown as TypedDocumentString<ClearCartMutation, ClearCartMutationVariables>;
export const RateProductDocument = new TypedDocumentString(`
    mutation RateProduct($input: RateProductInput!) {
  rateProduct(input: $input) {
    result {
      id
      average
    }
  }
}
    `) as unknown as TypedDocumentString<RateProductMutation, RateProductMutationVariables>;
export const ProductRatingDocument = new TypedDocumentString(`
    query ProductRating($id: ID!) {
  productRatingByProductIds(ids: [$id]) {
    result {
      id
      average
    }
  }
}
    `) as unknown as TypedDocumentString<ProductRatingQuery, ProductRatingQueryVariables>;
export const CartDocument = new TypedDocumentString(`
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
    fragment CartItemMapper on CartItem {
  productId
  count
}`) as unknown as TypedDocumentString<CartQuery, CartQueryVariables>;
export const ProductDocument = new TypedDocumentString(`
    query Product($id: ID!) {
  productsByIds(ids: [$id]) {
    result {
      ...ProductMapper
    }
  }
}
    fragment ProductMapper on Product {
  id
  name
  description
  price
  category
  imageUrl
  stockCount
  reviewCount
  stockCount
}`) as unknown as TypedDocumentString<ProductQuery, ProductQueryVariables>;
export const ProductsDocument = new TypedDocumentString(`
    query Products($filter: ProductListFilterInput!, $pagination: PaginationInput!) {
  productList(filter: $filter, pagination: $pagination) {
    result {
      ...ProductMapper
    }
    pagination {
      ...PaginationMapper
    }
  }
}
    fragment PaginationMapper on PaginationResult {
  total
  page
  pageSize
  totalPages
}
fragment ProductMapper on Product {
  id
  name
  description
  price
  category
  imageUrl
  stockCount
  reviewCount
  stockCount
}`) as unknown as TypedDocumentString<ProductsQuery, ProductsQueryVariables>;