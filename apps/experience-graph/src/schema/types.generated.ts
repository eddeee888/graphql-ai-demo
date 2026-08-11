import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { CartItemMapper, ProductMapper } from './product/schema.mappers';
import { ChatMessageMapper } from './agent/schema.mappers';
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
  DateTime: { input: Date | string; output: Date | string; }
};

export type AddItemToCartInput = {
  count?: InputMaybe<Scalars['Int']['input']>;
  productId: Scalars['ID']['input'];
};

export type AddItemToCartResponse = AddItemToCartResponseSuccess | ResponseError;

export type AddItemToCartResponseSuccess = {
  __typename?: 'AddItemToCartResponseSuccess';
  result: Cart;
};

export type AgentChat = {
  __typename?: 'AgentChat';
  id: Scalars['ID']['output'];
  messages: Array<ChatMessage>;
};

export type AgentChatResponse = AgentChatResponseSuccess | ResponseError;

export type AgentChatResponseSuccess = {
  __typename?: 'AgentChatResponseSuccess';
  result: AgentChat;
};

export type AgentChatUpdate = AgentEventRunCompleted | AgentEventTextDelta | ChatMessage;

export type AgentEventRunCompleted = {
  __typename?: 'AgentEventRunCompleted';
  seq: Scalars['Int']['output'];
};

export type AgentEventTextDelta = {
  __typename?: 'AgentEventTextDelta';
  seq: Scalars['Int']['output'];
  text: Scalars['String']['output'];
};

export type Cart = {
  __typename?: 'Cart';
  id: Scalars['ID']['output'];
  items: Array<CartItem>;
};

export type CartItem = {
  __typename?: 'CartItem';
  count: Scalars['Int']['output'];
  product: CartItemProductResponse;
};

export type CartItemProductResponse = CartItemProductResponseSuccess | ResponseError;

export type CartItemProductResponseSuccess = {
  __typename?: 'CartItemProductResponseSuccess';
  result: Product;
};

export type CartResponse = CartResponseSuccess | ResponseError;

export type CartResponseSuccess = {
  __typename?: 'CartResponseSuccess';
  result: Cart;
};

export type CartUpdatesResponseSuccess = {
  __typename?: 'CartUpdatesResponseSuccess';
  update: Scalars['String']['output'];
};

export type ChatMessage = {
  __typename?: 'ChatMessage';
  content: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  isMe: Scalars['Boolean']['output'];
};

export type ClearCartResponse = ClearCartResponseSuccess | ResponseError;

export type ClearCartResponseSuccess = {
  __typename?: 'ClearCartResponseSuccess';
  result: Cart;
};

export type Mutation = {
  __typename?: 'Mutation';
  addItemToCart: AddItemToCartResponse;
  clearCart: ClearCartResponse;
  rateProduct: RateProductResponse;
  sendAgentChatMessage: SendAgentChatMessageResponse;
};


export type MutationaddItemToCartArgs = {
  input: AddItemToCartInput;
};


export type MutationrateProductArgs = {
  input: RateProductInput;
};


export type MutationsendAgentChatMessageArgs = {
  input: SendAgentChatMessageInput;
};

export type PaginationInput = {
  page?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
};

export type Product = {
  __typename?: 'Product';
  category: Scalars['String']['output'];
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  imageUrl: Scalars['String']['output'];
  inStock: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  price: Scalars['Float']['output'];
  rating: ProductRatingResponse;
  reviewCount: Scalars['Int']['output'];
};

export type ProductRating = {
  __typename?: 'ProductRating';
  id: Scalars['ID']['output'];
  value: Scalars['Float']['output'];
};

export type ProductRatingResponse = ProductRatingResponseSuccess | ResponseError;

export type ProductRatingResponseSuccess = {
  __typename?: 'ProductRatingResponseSuccess';
  result: ProductRating;
};

export type ProductResponse = ProductResponseSuccess | ResponseError;

export type ProductResponseSuccess = {
  __typename?: 'ProductResponseSuccess';
  result?: Maybe<Product>;
};

export type ProductsInput = {
  categories?: InputMaybe<Array<Scalars['String']['input']>>;
  inStock?: InputMaybe<Scalars['Boolean']['input']>;
  maxPrice?: InputMaybe<Scalars['Int']['input']>;
  minPrice?: InputMaybe<Scalars['Int']['input']>;
  searchTerm?: InputMaybe<Scalars['String']['input']>;
};

export type ProductsResponse = ProductsResponseSuccess | ResponseError;

export type ProductsResponseSuccess = {
  __typename?: 'ProductsResponseSuccess';
  page: Scalars['Int']['output'];
  pageSize: Scalars['Int']['output'];
  result: Array<Product>;
  total: Scalars['Int']['output'];
  totalPages: Scalars['Int']['output'];
};

export type Query = {
  __typename?: 'Query';
  agentChat: AgentChatResponse;
  cart: CartResponse;
  product: ProductResponse;
  products: ProductsResponse;
};


export type QueryproductArgs = {
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

export type RateProductResponse = RateProductResponseSuccess | ResponseError;

export type RateProductResponseSuccess = {
  __typename?: 'RateProductResponseSuccess';
  result: ProductRating;
};

export type ResponseError = {
  __typename?: 'ResponseError';
  type: ResponseErrorType;
};

export type ResponseErrorType =
  | 'SERVER_ERROR'
  | 'UNAUTHENTICATED';

export type SendAgentChatMessageInput = {
  content: Scalars['String']['input'];
  messageId: Scalars['ID']['input'];
};

export type SendAgentChatMessageResponse = ResponseError | SendAgentChatMessageResponseSuccess;

export type SendAgentChatMessageResponseSuccess = {
  __typename?: 'SendAgentChatMessageResponseSuccess';
  result: ChatMessage;
};

export type Subscription = {
  __typename?: 'Subscription';
  agentChatUpdates: AgentChatUpdate;
  cartUpdates: CartUpdatesResponseSuccess;
};



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



/** Mapping of union types */
export type ResolversUnionTypes<_RefType extends Record<string, unknown>> = {
  AddItemToCartResponse:
    | ( Omit<AddItemToCartResponseSuccess, 'result'> & { result: _RefType['Cart'] } & { __typename: 'AddItemToCartResponseSuccess' } )
    | ( Omit<ResponseError, 'type'> & { type: _RefType['ResponseErrorType'] } & { __typename: 'ResponseError' } )
  ;
  AgentChatResponse:
    | ( Omit<AgentChatResponseSuccess, 'result'> & { result: _RefType['AgentChat'] } & { __typename: 'AgentChatResponseSuccess' } )
    | ( Omit<ResponseError, 'type'> & { type: _RefType['ResponseErrorType'] } & { __typename: 'ResponseError' } )
  ;
  AgentChatUpdate:
    | ( AgentEventRunCompleted & { __typename: 'AgentEventRunCompleted' } )
    | ( AgentEventTextDelta & { __typename: 'AgentEventTextDelta' } )
    | ( ChatMessageMapper & { __typename: 'ChatMessage' } )
  ;
  CartItemProductResponse:
    | ( Omit<CartItemProductResponseSuccess, 'result'> & { result: _RefType['Product'] } & { __typename: 'CartItemProductResponseSuccess' } )
    | ( Omit<ResponseError, 'type'> & { type: _RefType['ResponseErrorType'] } & { __typename: 'ResponseError' } )
  ;
  CartResponse:
    | ( Omit<CartResponseSuccess, 'result'> & { result: _RefType['Cart'] } & { __typename: 'CartResponseSuccess' } )
    | ( Omit<ResponseError, 'type'> & { type: _RefType['ResponseErrorType'] } & { __typename: 'ResponseError' } )
  ;
  ClearCartResponse:
    | ( Omit<ClearCartResponseSuccess, 'result'> & { result: _RefType['Cart'] } & { __typename: 'ClearCartResponseSuccess' } )
    | ( Omit<ResponseError, 'type'> & { type: _RefType['ResponseErrorType'] } & { __typename: 'ResponseError' } )
  ;
  ProductRatingResponse:
    | ( ProductRatingResponseSuccess & { __typename: 'ProductRatingResponseSuccess' } )
    | ( Omit<ResponseError, 'type'> & { type: _RefType['ResponseErrorType'] } & { __typename: 'ResponseError' } )
  ;
  ProductResponse:
    | ( Omit<ProductResponseSuccess, 'result'> & { result?: Maybe<_RefType['Product']> } & { __typename: 'ProductResponseSuccess' } )
    | ( Omit<ResponseError, 'type'> & { type: _RefType['ResponseErrorType'] } & { __typename: 'ResponseError' } )
  ;
  ProductsResponse:
    | ( Omit<ProductsResponseSuccess, 'result'> & { result: Array<_RefType['Product']> } & { __typename: 'ProductsResponseSuccess' } )
    | ( Omit<ResponseError, 'type'> & { type: _RefType['ResponseErrorType'] } & { __typename: 'ResponseError' } )
  ;
  RateProductResponse:
    | ( RateProductResponseSuccess & { __typename: 'RateProductResponseSuccess' } )
    | ( Omit<ResponseError, 'type'> & { type: _RefType['ResponseErrorType'] } & { __typename: 'ResponseError' } )
  ;
  SendAgentChatMessageResponse:
    | ( Omit<ResponseError, 'type'> & { type: _RefType['ResponseErrorType'] } & { __typename: 'ResponseError' } )
    | ( Omit<SendAgentChatMessageResponseSuccess, 'result'> & { result: _RefType['ChatMessage'] } & { __typename: 'SendAgentChatMessageResponseSuccess' } )
  ;
};


/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  AddItemToCartInput: AddItemToCartInput;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  AddItemToCartResponse: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['AddItemToCartResponse']>;
  AddItemToCartResponseSuccess: ResolverTypeWrapper<Omit<AddItemToCartResponseSuccess, 'result'> & { result: ResolversTypes['Cart'] }>;
  AgentChat: ResolverTypeWrapper<Omit<AgentChat, 'messages'> & { messages: Array<ResolversTypes['ChatMessage']> }>;
  AgentChatResponse: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['AgentChatResponse']>;
  AgentChatResponseSuccess: ResolverTypeWrapper<Omit<AgentChatResponseSuccess, 'result'> & { result: ResolversTypes['AgentChat'] }>;
  AgentChatUpdate: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['AgentChatUpdate']>;
  AgentEventRunCompleted: ResolverTypeWrapper<AgentEventRunCompleted>;
  AgentEventTextDelta: ResolverTypeWrapper<AgentEventTextDelta>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  Cart: ResolverTypeWrapper<Omit<Cart, 'items'> & { items: Array<ResolversTypes['CartItem']> }>;
  CartItem: ResolverTypeWrapper<CartItemMapper>;
  CartItemProductResponse: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['CartItemProductResponse']>;
  CartItemProductResponseSuccess: ResolverTypeWrapper<Omit<CartItemProductResponseSuccess, 'result'> & { result: ResolversTypes['Product'] }>;
  CartResponse: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['CartResponse']>;
  CartResponseSuccess: ResolverTypeWrapper<Omit<CartResponseSuccess, 'result'> & { result: ResolversTypes['Cart'] }>;
  CartUpdatesResponseSuccess: ResolverTypeWrapper<CartUpdatesResponseSuccess>;
  ChatMessage: ResolverTypeWrapper<ChatMessageMapper>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  ClearCartResponse: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['ClearCartResponse']>;
  ClearCartResponseSuccess: ResolverTypeWrapper<Omit<ClearCartResponseSuccess, 'result'> & { result: ResolversTypes['Cart'] }>;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']['output']>;
  Mutation: ResolverTypeWrapper<Record<PropertyKey, never>>;
  PaginationInput: PaginationInput;
  Product: ResolverTypeWrapper<ProductMapper>;
  Float: ResolverTypeWrapper<Scalars['Float']['output']>;
  ProductRating: ResolverTypeWrapper<ProductRating>;
  ProductRatingResponse: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['ProductRatingResponse']>;
  ProductRatingResponseSuccess: ResolverTypeWrapper<ProductRatingResponseSuccess>;
  ProductResponse: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['ProductResponse']>;
  ProductResponseSuccess: ResolverTypeWrapper<Omit<ProductResponseSuccess, 'result'> & { result?: Maybe<ResolversTypes['Product']> }>;
  ProductsInput: ProductsInput;
  ProductsResponse: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['ProductsResponse']>;
  ProductsResponseSuccess: ResolverTypeWrapper<Omit<ProductsResponseSuccess, 'result'> & { result: Array<ResolversTypes['Product']> }>;
  Query: ResolverTypeWrapper<Record<PropertyKey, never>>;
  RateProductInput: RateProductInput;
  RateProductResponse: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['RateProductResponse']>;
  RateProductResponseSuccess: ResolverTypeWrapper<RateProductResponseSuccess>;
  ResponseError: ResolverTypeWrapper<Omit<ResponseError, 'type'> & { type: ResolversTypes['ResponseErrorType'] }>;
  ResponseErrorType: ResolverTypeWrapper<'UNAUTHENTICATED' | 'SERVER_ERROR'>;
  SendAgentChatMessageInput: SendAgentChatMessageInput;
  SendAgentChatMessageResponse: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['SendAgentChatMessageResponse']>;
  SendAgentChatMessageResponseSuccess: ResolverTypeWrapper<Omit<SendAgentChatMessageResponseSuccess, 'result'> & { result: ResolversTypes['ChatMessage'] }>;
  Subscription: ResolverTypeWrapper<Record<PropertyKey, never>>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  AddItemToCartInput: AddItemToCartInput;
  Int: Scalars['Int']['output'];
  ID: Scalars['ID']['output'];
  AddItemToCartResponse: ResolversUnionTypes<ResolversParentTypes>['AddItemToCartResponse'];
  AddItemToCartResponseSuccess: Omit<AddItemToCartResponseSuccess, 'result'> & { result: ResolversParentTypes['Cart'] };
  AgentChat: Omit<AgentChat, 'messages'> & { messages: Array<ResolversParentTypes['ChatMessage']> };
  AgentChatResponse: ResolversUnionTypes<ResolversParentTypes>['AgentChatResponse'];
  AgentChatResponseSuccess: Omit<AgentChatResponseSuccess, 'result'> & { result: ResolversParentTypes['AgentChat'] };
  AgentChatUpdate: ResolversUnionTypes<ResolversParentTypes>['AgentChatUpdate'];
  AgentEventRunCompleted: AgentEventRunCompleted;
  AgentEventTextDelta: AgentEventTextDelta;
  String: Scalars['String']['output'];
  Cart: Omit<Cart, 'items'> & { items: Array<ResolversParentTypes['CartItem']> };
  CartItem: CartItemMapper;
  CartItemProductResponse: ResolversUnionTypes<ResolversParentTypes>['CartItemProductResponse'];
  CartItemProductResponseSuccess: Omit<CartItemProductResponseSuccess, 'result'> & { result: ResolversParentTypes['Product'] };
  CartResponse: ResolversUnionTypes<ResolversParentTypes>['CartResponse'];
  CartResponseSuccess: Omit<CartResponseSuccess, 'result'> & { result: ResolversParentTypes['Cart'] };
  CartUpdatesResponseSuccess: CartUpdatesResponseSuccess;
  ChatMessage: ChatMessageMapper;
  Boolean: Scalars['Boolean']['output'];
  ClearCartResponse: ResolversUnionTypes<ResolversParentTypes>['ClearCartResponse'];
  ClearCartResponseSuccess: Omit<ClearCartResponseSuccess, 'result'> & { result: ResolversParentTypes['Cart'] };
  DateTime: Scalars['DateTime']['output'];
  Mutation: Record<PropertyKey, never>;
  PaginationInput: PaginationInput;
  Product: ProductMapper;
  Float: Scalars['Float']['output'];
  ProductRating: ProductRating;
  ProductRatingResponse: ResolversUnionTypes<ResolversParentTypes>['ProductRatingResponse'];
  ProductRatingResponseSuccess: ProductRatingResponseSuccess;
  ProductResponse: ResolversUnionTypes<ResolversParentTypes>['ProductResponse'];
  ProductResponseSuccess: Omit<ProductResponseSuccess, 'result'> & { result?: Maybe<ResolversParentTypes['Product']> };
  ProductsInput: ProductsInput;
  ProductsResponse: ResolversUnionTypes<ResolversParentTypes>['ProductsResponse'];
  ProductsResponseSuccess: Omit<ProductsResponseSuccess, 'result'> & { result: Array<ResolversParentTypes['Product']> };
  Query: Record<PropertyKey, never>;
  RateProductInput: RateProductInput;
  RateProductResponse: ResolversUnionTypes<ResolversParentTypes>['RateProductResponse'];
  RateProductResponseSuccess: RateProductResponseSuccess;
  ResponseError: ResponseError;
  SendAgentChatMessageInput: SendAgentChatMessageInput;
  SendAgentChatMessageResponse: ResolversUnionTypes<ResolversParentTypes>['SendAgentChatMessageResponse'];
  SendAgentChatMessageResponseSuccess: Omit<SendAgentChatMessageResponseSuccess, 'result'> & { result: ResolversParentTypes['ChatMessage'] };
  Subscription: Record<PropertyKey, never>;
};

export type AddItemToCartResponseResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['AddItemToCartResponse'] = ResolversParentTypes['AddItemToCartResponse']> = {
  __resolveType?: TypeResolveFn<'AddItemToCartResponseSuccess' | 'ResponseError', ParentType, ContextType>;
};

export type AddItemToCartResponseSuccessResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['AddItemToCartResponseSuccess'] = ResolversParentTypes['AddItemToCartResponseSuccess']> = {
  result?: Resolver<ResolversTypes['Cart'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AgentChatResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['AgentChat'] = ResolversParentTypes['AgentChat']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  messages?: Resolver<Array<ResolversTypes['ChatMessage']>, ParentType, ContextType>;
};

export type AgentChatResponseResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['AgentChatResponse'] = ResolversParentTypes['AgentChatResponse']> = {
  __resolveType?: TypeResolveFn<'AgentChatResponseSuccess' | 'ResponseError', ParentType, ContextType>;
};

export type AgentChatResponseSuccessResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['AgentChatResponseSuccess'] = ResolversParentTypes['AgentChatResponseSuccess']> = {
  result?: Resolver<ResolversTypes['AgentChat'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AgentChatUpdateResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['AgentChatUpdate'] = ResolversParentTypes['AgentChatUpdate']> = {
  __resolveType?: TypeResolveFn<'AgentEventRunCompleted' | 'AgentEventTextDelta' | 'ChatMessage', ParentType, ContextType>;
};

export type AgentEventRunCompletedResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['AgentEventRunCompleted'] = ResolversParentTypes['AgentEventRunCompleted']> = {
  seq?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AgentEventTextDeltaResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['AgentEventTextDelta'] = ResolversParentTypes['AgentEventTextDelta']> = {
  seq?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  text?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CartResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['Cart'] = ResolversParentTypes['Cart']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  items?: Resolver<Array<ResolversTypes['CartItem']>, ParentType, ContextType>;
};

export type CartItemResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['CartItem'] = ResolversParentTypes['CartItem']> = {
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  product?: Resolver<ResolversTypes['CartItemProductResponse'], ParentType, ContextType>;
};

export type CartItemProductResponseResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['CartItemProductResponse'] = ResolversParentTypes['CartItemProductResponse']> = {
  __resolveType?: TypeResolveFn<'CartItemProductResponseSuccess' | 'ResponseError', ParentType, ContextType>;
};

export type CartItemProductResponseSuccessResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['CartItemProductResponseSuccess'] = ResolversParentTypes['CartItemProductResponseSuccess']> = {
  result?: Resolver<ResolversTypes['Product'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CartResponseResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['CartResponse'] = ResolversParentTypes['CartResponse']> = {
  __resolveType?: TypeResolveFn<'CartResponseSuccess' | 'ResponseError', ParentType, ContextType>;
};

export type CartResponseSuccessResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['CartResponseSuccess'] = ResolversParentTypes['CartResponseSuccess']> = {
  result?: Resolver<ResolversTypes['Cart'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CartUpdatesResponseSuccessResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['CartUpdatesResponseSuccess'] = ResolversParentTypes['CartUpdatesResponseSuccess']> = {
  update?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
};

export type ChatMessageResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['ChatMessage'] = ResolversParentTypes['ChatMessage']> = {
  content?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  isMe?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ClearCartResponseResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['ClearCartResponse'] = ResolversParentTypes['ClearCartResponse']> = {
  __resolveType?: TypeResolveFn<'ClearCartResponseSuccess' | 'ResponseError', ParentType, ContextType>;
};

export type ClearCartResponseSuccessResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['ClearCartResponseSuccess'] = ResolversParentTypes['ClearCartResponseSuccess']> = {
  result?: Resolver<ResolversTypes['Cart'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export type MutationResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  addItemToCart?: Resolver<ResolversTypes['AddItemToCartResponse'], ParentType, ContextType, RequireFields<MutationaddItemToCartArgs, 'input'>>;
  clearCart?: Resolver<ResolversTypes['ClearCartResponse'], ParentType, ContextType>;
  rateProduct?: Resolver<ResolversTypes['RateProductResponse'], ParentType, ContextType, RequireFields<MutationrateProductArgs, 'input'>>;
  sendAgentChatMessage?: Resolver<ResolversTypes['SendAgentChatMessageResponse'], ParentType, ContextType, RequireFields<MutationsendAgentChatMessageArgs, 'input'>>;
};

export type ProductResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['Product'] = ResolversParentTypes['Product']> = {
  category?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  imageUrl?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  inStock?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  price?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  rating?: Resolver<ResolversTypes['ProductRatingResponse'], ParentType, ContextType>;
  reviewCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
};

export type ProductRatingResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['ProductRating'] = ResolversParentTypes['ProductRating']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  value?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
};

export type ProductRatingResponseResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['ProductRatingResponse'] = ResolversParentTypes['ProductRatingResponse']> = {
  __resolveType?: TypeResolveFn<'ProductRatingResponseSuccess' | 'ResponseError', ParentType, ContextType>;
};

export type ProductRatingResponseSuccessResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['ProductRatingResponseSuccess'] = ResolversParentTypes['ProductRatingResponseSuccess']> = {
  result?: Resolver<ResolversTypes['ProductRating'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProductResponseResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['ProductResponse'] = ResolversParentTypes['ProductResponse']> = {
  __resolveType?: TypeResolveFn<'ProductResponseSuccess' | 'ResponseError', ParentType, ContextType>;
};

export type ProductResponseSuccessResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['ProductResponseSuccess'] = ResolversParentTypes['ProductResponseSuccess']> = {
  result?: Resolver<Maybe<ResolversTypes['Product']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProductsResponseResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['ProductsResponse'] = ResolversParentTypes['ProductsResponse']> = {
  __resolveType?: TypeResolveFn<'ProductsResponseSuccess' | 'ResponseError', ParentType, ContextType>;
};

export type ProductsResponseSuccessResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['ProductsResponseSuccess'] = ResolversParentTypes['ProductsResponseSuccess']> = {
  page?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  pageSize?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  result?: Resolver<Array<ResolversTypes['Product']>, ParentType, ContextType>;
  total?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  totalPages?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  agentChat?: Resolver<ResolversTypes['AgentChatResponse'], ParentType, ContextType>;
  cart?: Resolver<ResolversTypes['CartResponse'], ParentType, ContextType>;
  product?: Resolver<ResolversTypes['ProductResponse'], ParentType, ContextType, RequireFields<QueryproductArgs, 'id'>>;
  products?: Resolver<ResolversTypes['ProductsResponse'], ParentType, ContextType, RequireFields<QueryproductsArgs, 'input' | 'pagination'>>;
};

export type RateProductResponseResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['RateProductResponse'] = ResolversParentTypes['RateProductResponse']> = {
  __resolveType?: TypeResolveFn<'RateProductResponseSuccess' | 'ResponseError', ParentType, ContextType>;
};

export type RateProductResponseSuccessResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['RateProductResponseSuccess'] = ResolversParentTypes['RateProductResponseSuccess']> = {
  result?: Resolver<ResolversTypes['ProductRating'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ResponseErrorResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['ResponseError'] = ResolversParentTypes['ResponseError']> = {
  type?: Resolver<ResolversTypes['ResponseErrorType'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ResponseErrorTypeResolvers = EnumResolverSignature<{ SERVER_ERROR?: any, UNAUTHENTICATED?: any }, ResolversTypes['ResponseErrorType']>;

export type SendAgentChatMessageResponseResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['SendAgentChatMessageResponse'] = ResolversParentTypes['SendAgentChatMessageResponse']> = {
  __resolveType?: TypeResolveFn<'ResponseError' | 'SendAgentChatMessageResponseSuccess', ParentType, ContextType>;
};

export type SendAgentChatMessageResponseSuccessResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['SendAgentChatMessageResponseSuccess'] = ResolversParentTypes['SendAgentChatMessageResponseSuccess']> = {
  result?: Resolver<ResolversTypes['ChatMessage'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SubscriptionResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']> = {
  agentChatUpdates?: SubscriptionResolver<ResolversTypes['AgentChatUpdate'], "agentChatUpdates", ParentType, ContextType>;
  cartUpdates?: SubscriptionResolver<ResolversTypes['CartUpdatesResponseSuccess'], "cartUpdates", ParentType, ContextType>;
};

export type Resolvers<ContextType = ResolverContext> = {
  AddItemToCartResponse?: AddItemToCartResponseResolvers<ContextType>;
  AddItemToCartResponseSuccess?: AddItemToCartResponseSuccessResolvers<ContextType>;
  AgentChat?: AgentChatResolvers<ContextType>;
  AgentChatResponse?: AgentChatResponseResolvers<ContextType>;
  AgentChatResponseSuccess?: AgentChatResponseSuccessResolvers<ContextType>;
  AgentChatUpdate?: AgentChatUpdateResolvers<ContextType>;
  AgentEventRunCompleted?: AgentEventRunCompletedResolvers<ContextType>;
  AgentEventTextDelta?: AgentEventTextDeltaResolvers<ContextType>;
  Cart?: CartResolvers<ContextType>;
  CartItem?: CartItemResolvers<ContextType>;
  CartItemProductResponse?: CartItemProductResponseResolvers<ContextType>;
  CartItemProductResponseSuccess?: CartItemProductResponseSuccessResolvers<ContextType>;
  CartResponse?: CartResponseResolvers<ContextType>;
  CartResponseSuccess?: CartResponseSuccessResolvers<ContextType>;
  CartUpdatesResponseSuccess?: CartUpdatesResponseSuccessResolvers<ContextType>;
  ChatMessage?: ChatMessageResolvers<ContextType>;
  ClearCartResponse?: ClearCartResponseResolvers<ContextType>;
  ClearCartResponseSuccess?: ClearCartResponseSuccessResolvers<ContextType>;
  DateTime?: GraphQLScalarType;
  Mutation?: MutationResolvers<ContextType>;
  Product?: ProductResolvers<ContextType>;
  ProductRating?: ProductRatingResolvers<ContextType>;
  ProductRatingResponse?: ProductRatingResponseResolvers<ContextType>;
  ProductRatingResponseSuccess?: ProductRatingResponseSuccessResolvers<ContextType>;
  ProductResponse?: ProductResponseResolvers<ContextType>;
  ProductResponseSuccess?: ProductResponseSuccessResolvers<ContextType>;
  ProductsResponse?: ProductsResponseResolvers<ContextType>;
  ProductsResponseSuccess?: ProductsResponseSuccessResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  RateProductResponse?: RateProductResponseResolvers<ContextType>;
  RateProductResponseSuccess?: RateProductResponseSuccessResolvers<ContextType>;
  ResponseError?: ResponseErrorResolvers<ContextType>;
  ResponseErrorType?: ResponseErrorTypeResolvers;
  SendAgentChatMessageResponse?: SendAgentChatMessageResponseResolvers<ContextType>;
  SendAgentChatMessageResponseSuccess?: SendAgentChatMessageResponseSuccessResolvers<ContextType>;
  Subscription?: SubscriptionResolvers<ContextType>;
};

