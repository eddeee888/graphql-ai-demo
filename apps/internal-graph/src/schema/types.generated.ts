import { GraphQLResolveInfo } from 'graphql';
import { ProductMapper } from './product/schema.mappers';
import { ResolverContext } from '../main';
export type Maybe<T> = T | null | undefined;
export type InputMaybe<T> = T | null | undefined;
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
export type EnumResolverSignature<T, AllowedValues = any> = { [key in keyof T]?: AllowedValues };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string | number; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Cart = {
  __typename?: 'Cart';
  id: Scalars['ID']['output'];
  items: Array<CartItem>;
};

export type CartItem = {
  __typename?: 'CartItem';
  count: Scalars['Int']['output'];
  productId: Scalars['ID']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  rateProduct?: Maybe<ProductRating>;
};


export type MutationrateProductArgs = {
  input: RateProductInput;
};

export type PaginationInput = {
  page?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
};

export type PaginationResult = {
  __typename?: 'PaginationResult';
  page: Scalars['Int']['output'];
  pageSize: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
  totalPages: Scalars['Int']['output'];
};

export type Product = {
  __typename?: 'Product';
  category: Scalars['String']['output'];
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  imageUrl: Scalars['String']['output'];
  name: Scalars['String']['output'];
  price: Scalars['Float']['output'];
  reviewCount: Scalars['Int']['output'];
  stockCount: Scalars['Int']['output'];
};

export type ProductRating = {
  __typename?: 'ProductRating';
  id: Scalars['ID']['output'];
  value: Scalars['Float']['output'];
};

export type ProductReviewCount = {
  __typename?: 'ProductReviewCount';
  id: Scalars['ID']['output'];
  value: Scalars['Int']['output'];
};

export type ProductsInput = {
  category?: InputMaybe<Scalars['String']['input']>;
  inStock?: InputMaybe<Scalars['Boolean']['input']>;
  maxPrice?: InputMaybe<Scalars['Int']['input']>;
  minPrice?: InputMaybe<Scalars['Int']['input']>;
  searchTerm?: InputMaybe<Scalars['String']['input']>;
};

export type ProductsResponse = {
  __typename?: 'ProductsResponse';
  pagination: PaginationResult;
  result: Array<Product>;
};

export type Query = {
  __typename?: 'Query';
  cart?: Maybe<Cart>;
  product?: Maybe<Product>;
  productRating: ProductRating;
  products: ProductsResponse;
};


export type QuerycartArgs = {
  id: Scalars['ID']['input'];
};


export type QueryproductArgs = {
  id: Scalars['ID']['input'];
};


export type QueryproductRatingArgs = {
  id: Scalars['ID']['input'];
};


export type QueryproductsArgs = {
  input: ProductsInput;
  pagination: PaginationInput;
};

export type RateProductInput = {
  id: Scalars['ID']['input'];
  rating: Scalars['Int']['input'];
};

export type ResponseError = {
  __typename?: 'ResponseError';
  type: ResponseErrorType;
};

export type ResponseErrorType =
  | 'SERVER_ERROR';



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>, TArgs = Record<PropertyKey, never>> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>, TArgs = Record<PropertyKey, never>> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = Record<PropertyKey, never>, TParent = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>, TArgs = Record<PropertyKey, never>> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;





/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Cart: ResolverTypeWrapper<Cart>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  CartItem: ResolverTypeWrapper<CartItem>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Mutation: ResolverTypeWrapper<Record<PropertyKey, never>>;
  PaginationInput: PaginationInput;
  PaginationResult: ResolverTypeWrapper<PaginationResult>;
  Product: ResolverTypeWrapper<ProductMapper>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  Float: ResolverTypeWrapper<Scalars['Float']['output']>;
  ProductRating: ResolverTypeWrapper<ProductRating>;
  ProductReviewCount: ResolverTypeWrapper<ProductReviewCount>;
  ProductsInput: ProductsInput;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  ProductsResponse: ResolverTypeWrapper<Omit<ProductsResponse, 'result'> & { result: Array<ResolversTypes['Product']> }>;
  Query: ResolverTypeWrapper<Record<PropertyKey, never>>;
  RateProductInput: RateProductInput;
  ResponseError: ResolverTypeWrapper<Omit<ResponseError, 'type'> & { type: ResolversTypes['ResponseErrorType'] }>;
  ResponseErrorType: ResolverTypeWrapper<'SERVER_ERROR'>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Cart: Cart;
  ID: Scalars['ID']['output'];
  CartItem: CartItem;
  Int: Scalars['Int']['output'];
  Mutation: Record<PropertyKey, never>;
  PaginationInput: PaginationInput;
  PaginationResult: PaginationResult;
  Product: ProductMapper;
  String: Scalars['String']['output'];
  Float: Scalars['Float']['output'];
  ProductRating: ProductRating;
  ProductReviewCount: ProductReviewCount;
  ProductsInput: ProductsInput;
  Boolean: Scalars['Boolean']['output'];
  ProductsResponse: Omit<ProductsResponse, 'result'> & { result: Array<ResolversParentTypes['Product']> };
  Query: Record<PropertyKey, never>;
  RateProductInput: RateProductInput;
  ResponseError: ResponseError;
};

export type CartResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['Cart'] = ResolversParentTypes['Cart']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  items?: Resolver<Array<ResolversTypes['CartItem']>, ParentType, ContextType>;
};

export type CartItemResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['CartItem'] = ResolversParentTypes['CartItem']> = {
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  productId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
};

export type MutationResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  rateProduct?: Resolver<Maybe<ResolversTypes['ProductRating']>, ParentType, ContextType, RequireFields<MutationrateProductArgs, 'input'>>;
};

export type PaginationResultResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['PaginationResult'] = ResolversParentTypes['PaginationResult']> = {
  page?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  pageSize?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  total?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  totalPages?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
};

export type ProductResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['Product'] = ResolversParentTypes['Product']> = {
  category?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  imageUrl?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  price?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  reviewCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  stockCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
};

export type ProductRatingResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['ProductRating'] = ResolversParentTypes['ProductRating']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  value?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
};

export type ProductReviewCountResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['ProductReviewCount'] = ResolversParentTypes['ProductReviewCount']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  value?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
};

export type ProductsResponseResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['ProductsResponse'] = ResolversParentTypes['ProductsResponse']> = {
  pagination?: Resolver<ResolversTypes['PaginationResult'], ParentType, ContextType>;
  result?: Resolver<Array<ResolversTypes['Product']>, ParentType, ContextType>;
};

export type QueryResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  cart?: Resolver<Maybe<ResolversTypes['Cart']>, ParentType, ContextType, RequireFields<QuerycartArgs, 'id'>>;
  product?: Resolver<Maybe<ResolversTypes['Product']>, ParentType, ContextType, RequireFields<QueryproductArgs, 'id'>>;
  productRating?: Resolver<ResolversTypes['ProductRating'], ParentType, ContextType, RequireFields<QueryproductRatingArgs, 'id'>>;
  products?: Resolver<ResolversTypes['ProductsResponse'], ParentType, ContextType, RequireFields<QueryproductsArgs, 'input' | 'pagination'>>;
};

export type ResponseErrorResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['ResponseError'] = ResolversParentTypes['ResponseError']> = {
  type?: Resolver<ResolversTypes['ResponseErrorType'], ParentType, ContextType>;
};

export type ResponseErrorTypeResolvers = EnumResolverSignature<{ SERVER_ERROR?: any }, ResolversTypes['ResponseErrorType']>;

export type Resolvers<ContextType = ResolverContext> = {
  Cart?: CartResolvers<ContextType>;
  CartItem?: CartItemResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  PaginationResult?: PaginationResultResolvers<ContextType>;
  Product?: ProductResolvers<ContextType>;
  ProductRating?: ProductRatingResolvers<ContextType>;
  ProductReviewCount?: ProductReviewCountResolvers<ContextType>;
  ProductsResponse?: ProductsResponseResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  ResponseError?: ResponseErrorResolvers<ContextType>;
  ResponseErrorType?: ResponseErrorTypeResolvers;
};

