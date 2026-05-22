/* eslint-disable */
/** Internal type. DO NOT USE DIRECTLY. */
type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** Internal type. DO NOT USE DIRECTLY. */
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
import { DocumentTypeDecoration } from '@graphql-typed-document-node/core';
export type AddItemToCartInput = {
  count: number;
  productId: string | number;
};

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

export type CartItemMapperFragment = { productId: string, count: number };

export type ProductMapperFragment = { id: string, name: string, description: string, price: number, category: string, imageUrl: string, stockCount: number, reviewCount: number };

export type CartItemProductQueryVariables = Exact<{
  id: string | number;
}>;


export type CartItemProductQuery = { product: { id: string, name: string, description: string, price: number, category: string, imageUrl: string, stockCount: number, reviewCount: number } | null };

export type AddItemToCartMutationVariables = Exact<{
  input: AddItemToCartInput;
}>;


export type AddItemToCartMutation = { addItemToCart: { id: string, items: Array<{ productId: string, count: number }> } };

export type ClearCartMutationVariables = Exact<{ [key: string]: never; }>;


export type ClearCartMutation = { clearCart: { id: string, items: Array<{ productId: string, count: number }> } };

export type RateProductMutationVariables = Exact<{
  input: RateProductInput;
}>;


export type RateProductMutation = { rateProduct: { id: string, value: number } | null };

export type ProductRatingQueryVariables = Exact<{
  id: string | number;
}>;


export type ProductRatingQuery = { productRating: { id: string, value: number } };

export type CartQueryVariables = Exact<{
  id: string | number;
}>;


export type CartQuery = { cart: { id: string, items: Array<{ productId: string, count: number }> } | null };

export type ProductQueryVariables = Exact<{
  id: string | number;
}>;


export type ProductQuery = { product: { id: string, name: string, description: string, price: number, category: string, imageUrl: string, stockCount: number, reviewCount: number } | null };

export type ProductsQueryVariables = Exact<{
  input: ProductsInput;
  pagination: PaginationInput;
}>;


export type ProductsQuery = { products: { result: Array<{ id: string, name: string, description: string, price: number, category: string, imageUrl: string, stockCount: number, reviewCount: number }>, pagination: { total: number, totalPages: number, page: number, pageSize: number } } };

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
export const CartItemProductDocument = new TypedDocumentString(`
    query CartItemProduct($id: ID!) {
  product(id: $id) {
    ...ProductMapper
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
    id
    items {
      ...CartItemMapper
    }
  }
}
    fragment CartItemMapper on CartItem {
  productId
  count
}`) as unknown as TypedDocumentString<AddItemToCartMutation, AddItemToCartMutationVariables>;
export const ClearCartDocument = new TypedDocumentString(`
    mutation ClearCart {
  clearCart {
    id
    items {
      ...CartItemMapper
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
    id
    value
  }
}
    `) as unknown as TypedDocumentString<RateProductMutation, RateProductMutationVariables>;
export const ProductRatingDocument = new TypedDocumentString(`
    query ProductRating($id: ID!) {
  productRating(id: $id) {
    id
    value
  }
}
    `) as unknown as TypedDocumentString<ProductRatingQuery, ProductRatingQueryVariables>;
export const CartDocument = new TypedDocumentString(`
    query Cart($id: ID!) {
  cart(id: $id) {
    id
    items {
      productId
      count
    }
  }
}
    `) as unknown as TypedDocumentString<CartQuery, CartQueryVariables>;
export const ProductDocument = new TypedDocumentString(`
    query Product($id: ID!) {
  product(id: $id) {
    ...ProductMapper
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
    query Products($input: ProductsInput!, $pagination: PaginationInput!) {
  products(input: $input, pagination: $pagination) {
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
    `) as unknown as TypedDocumentString<ProductsQuery, ProductsQueryVariables>;