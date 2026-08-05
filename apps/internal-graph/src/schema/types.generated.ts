import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { ResolverContext } from '../main';
export type Maybe<T> = T | null | undefined;
export type InputMaybe<T> = T | null | undefined;
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string | number; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: Date; output: Date | string; }
};

export type AddItemToCartInput = {
  count: Scalars['Int']['input'];
  productId: Scalars['ID']['input'];
  userId: Scalars['ID']['input'];
};

export type AddItemToCartResponse = {
  __typename?: 'AddItemToCartResponse';
  result: Cart;
};

export type Cart = {
  __typename?: 'Cart';
  /** Each user only has one cart, so the Cart ID is the User's ID */
  id: Scalars['ID']['output'];
  items: Array<CartItem>;
};

export type CartItem = {
  __typename?: 'CartItem';
  count: Scalars['Int']['output'];
  productId: Scalars['ID']['output'];
};

export type CartResponse = {
  __typename?: 'CartResponse';
  result: Cart;
};

export type Chat = {
  __typename?: 'Chat';
  id: Scalars['ID']['output'];
  messages: ChatMessagesResponse;
};

export type ChatMessage = {
  __typename?: 'ChatMessage';
  content: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  senderId: Scalars['ID']['output'];
};

export type ChatMessagesResponse = {
  __typename?: 'ChatMessagesResponse';
  result: Array<ChatMessage>;
};

export type ClearCartInput = {
  userId: Scalars['ID']['input'];
};

export type ClearCartResponse = {
  __typename?: 'ClearCartResponse';
  result: Cart;
};

export type CreateChatInput = {
  chatId: Scalars['ID']['input'];
  creatorId: Scalars['ID']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  /** Mutation to add a product to a user's cart */
  addItemToCart: AddItemToCartResponse;
  /** Mutation to clear a user's cart */
  clearCart: ClearCartResponse;
  createChat: Chat;
  /** Mutation.rateProduct rates a product as the userId in the input */
  rateProduct: RateProductResponse;
  sendChatMessage: ChatMessage;
};


export type MutationaddItemToCartArgs = {
  input: AddItemToCartInput;
};


export type MutationclearCartArgs = {
  input: ClearCartInput;
};


export type MutationcreateChatArgs = {
  input: CreateChatInput;
};


export type MutationrateProductArgs = {
  input: RateProductInput;
};


export type MutationsendChatMessageArgs = {
  input: SendChatMessageInput;
};

/** Standard pagination input */
export type PaginationInput = {
  page?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
};

/** Standard pagination result */
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

export type ProductListFilterInput = {
  categories?: InputMaybe<Array<Scalars['String']['input']>>;
  inStock?: InputMaybe<Scalars['Boolean']['input']>;
  maxPrice?: InputMaybe<Scalars['Int']['input']>;
  minPrice?: InputMaybe<Scalars['Int']['input']>;
  searchTerm?: InputMaybe<Scalars['String']['input']>;
};

export type ProductListResponse = {
  __typename?: 'ProductListResponse';
  pagination: PaginationResult;
  result: Array<Product>;
};

export type ProductRating = {
  __typename?: 'ProductRating';
  /** When the rating was created */
  createdAt: Scalars['DateTime']['output'];
  /** The effective person who made this rating */
  creatorUserId: Scalars['ID']['output'];
  /** ProductRating's UUID */
  id: Scalars['ID']['output'];
  /** The value of the rating */
  rating: Scalars['Int']['output'];
};

export type ProductRatingByProductIdsResponse = {
  __typename?: 'ProductRatingByProductIdsResponse';
  result: Array<Product_Rating>;
};

export type ProductRatingsFilterInput = {
  from: Scalars['DateTime']['input'];
  to: Scalars['DateTime']['input'];
};

export type ProductRatingsResponse = {
  __typename?: 'ProductRatingsResponse';
  pagination: PaginationResult;
  ratings: Array<ProductRating>;
};

/** Product_Rating is an extension of Product entity */
export type Product_Rating = {
  __typename?: 'Product_Rating';
  average: Scalars['Float']['output'];
  /** Product_Rating's ID is Product's ID */
  id: Scalars['ID']['output'];
};

export type ProductsByIdsResponse = {
  __typename?: 'ProductsByIdsResponse';
  result: Array<Maybe<Product>>;
};

export type Query = {
  __typename?: 'Query';
  /**
   * Query.cart
   * Gets a user's cart by the user's ID
   * Note that each user can only have one cart
   */
  cart: CartResponse;
  /**
   * Query.productList is more expensive to run compared to Query.productsByIds
   * This is because it does a scan across all items in the database
   * If the request has product IDs, Query.productsByIds instead
   */
  productList: ProductListResponse;
  /** Query.productRatingByProductIds gets ratings of provided product IDs */
  productRatingByProductIds: ProductRatingByProductIdsResponse;
  /** Query.productRatings gets paginated list of ProductRating */
  productRatings: ProductRatingsResponse;
  /**
   * Query.productsByIds should be used if a list of IDs is known
   * e.g. if the UI takes in an product ID to display
   */
  productsByIds: ProductsByIdsResponse;
};


export type QuerycartArgs = {
  id: Scalars['ID']['input'];
};


export type QueryproductListArgs = {
  filter: ProductListFilterInput;
  pagination: PaginationInput;
};


export type QueryproductRatingByProductIdsArgs = {
  ids: Array<Scalars['ID']['input']>;
};


export type QueryproductRatingsArgs = {
  filter: ProductRatingsFilterInput;
  pagination: PaginationInput;
};


export type QueryproductsByIdsArgs = {
  ids: Array<Scalars['ID']['input']>;
};

export type RateProductInput = {
  productId: Scalars['ID']['input'];
  rating: Scalars['Int']['input'];
  userId: Scalars['ID']['input'];
};

export type RateProductResponse = {
  __typename?: 'RateProductResponse';
  result: Product_Rating;
};

export type SendChatMessageInput = {
  chatId: Scalars['ID']['input'];
  content: Scalars['String']['input'];
  messageId: Scalars['ID']['input'];
  senderId: Scalars['ID']['input'];
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





/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  AddItemToCartInput: AddItemToCartInput;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  AddItemToCartResponse: ResolverTypeWrapper<AddItemToCartResponse>;
  Cart: ResolverTypeWrapper<Cart>;
  CartItem: ResolverTypeWrapper<CartItem>;
  CartResponse: ResolverTypeWrapper<CartResponse>;
  Chat: ResolverTypeWrapper<Chat>;
  ChatMessage: ResolverTypeWrapper<ChatMessage>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  ChatMessagesResponse: ResolverTypeWrapper<ChatMessagesResponse>;
  ClearCartInput: ClearCartInput;
  ClearCartResponse: ResolverTypeWrapper<ClearCartResponse>;
  CreateChatInput: CreateChatInput;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']['output']>;
  Mutation: ResolverTypeWrapper<Record<PropertyKey, never>>;
  PaginationInput: PaginationInput;
  PaginationResult: ResolverTypeWrapper<PaginationResult>;
  Product: ResolverTypeWrapper<Product>;
  Float: ResolverTypeWrapper<Scalars['Float']['output']>;
  ProductListFilterInput: ProductListFilterInput;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  ProductListResponse: ResolverTypeWrapper<ProductListResponse>;
  ProductRating: ResolverTypeWrapper<ProductRating>;
  ProductRatingByProductIdsResponse: ResolverTypeWrapper<ProductRatingByProductIdsResponse>;
  ProductRatingsFilterInput: ProductRatingsFilterInput;
  ProductRatingsResponse: ResolverTypeWrapper<ProductRatingsResponse>;
  Product_Rating: ResolverTypeWrapper<Product_Rating>;
  ProductsByIdsResponse: ResolverTypeWrapper<ProductsByIdsResponse>;
  Query: ResolverTypeWrapper<Record<PropertyKey, never>>;
  RateProductInput: RateProductInput;
  RateProductResponse: ResolverTypeWrapper<RateProductResponse>;
  SendChatMessageInput: SendChatMessageInput;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  AddItemToCartInput: AddItemToCartInput;
  Int: Scalars['Int']['output'];
  ID: Scalars['ID']['output'];
  AddItemToCartResponse: AddItemToCartResponse;
  Cart: Cart;
  CartItem: CartItem;
  CartResponse: CartResponse;
  Chat: Chat;
  ChatMessage: ChatMessage;
  String: Scalars['String']['output'];
  ChatMessagesResponse: ChatMessagesResponse;
  ClearCartInput: ClearCartInput;
  ClearCartResponse: ClearCartResponse;
  CreateChatInput: CreateChatInput;
  DateTime: Scalars['DateTime']['output'];
  Mutation: Record<PropertyKey, never>;
  PaginationInput: PaginationInput;
  PaginationResult: PaginationResult;
  Product: Product;
  Float: Scalars['Float']['output'];
  ProductListFilterInput: ProductListFilterInput;
  Boolean: Scalars['Boolean']['output'];
  ProductListResponse: ProductListResponse;
  ProductRating: ProductRating;
  ProductRatingByProductIdsResponse: ProductRatingByProductIdsResponse;
  ProductRatingsFilterInput: ProductRatingsFilterInput;
  ProductRatingsResponse: ProductRatingsResponse;
  Product_Rating: Product_Rating;
  ProductsByIdsResponse: ProductsByIdsResponse;
  Query: Record<PropertyKey, never>;
  RateProductInput: RateProductInput;
  RateProductResponse: RateProductResponse;
  SendChatMessageInput: SendChatMessageInput;
};

export type AddItemToCartResponseResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['AddItemToCartResponse'] = ResolversParentTypes['AddItemToCartResponse']> = {
  result?: Resolver<ResolversTypes['Cart'], ParentType, ContextType>;
};

export type CartResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['Cart'] = ResolversParentTypes['Cart']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  items?: Resolver<Array<ResolversTypes['CartItem']>, ParentType, ContextType>;
};

export type CartItemResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['CartItem'] = ResolversParentTypes['CartItem']> = {
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  productId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
};

export type CartResponseResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['CartResponse'] = ResolversParentTypes['CartResponse']> = {
  result?: Resolver<ResolversTypes['Cart'], ParentType, ContextType>;
};

export type ChatResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['Chat'] = ResolversParentTypes['Chat']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  messages?: Resolver<ResolversTypes['ChatMessagesResponse'], ParentType, ContextType>;
};

export type ChatMessageResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['ChatMessage'] = ResolversParentTypes['ChatMessage']> = {
  content?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  senderId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
};

export type ChatMessagesResponseResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['ChatMessagesResponse'] = ResolversParentTypes['ChatMessagesResponse']> = {
  result?: Resolver<Array<ResolversTypes['ChatMessage']>, ParentType, ContextType>;
};

export type ClearCartResponseResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['ClearCartResponse'] = ResolversParentTypes['ClearCartResponse']> = {
  result?: Resolver<ResolversTypes['Cart'], ParentType, ContextType>;
};

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export type MutationResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  addItemToCart?: Resolver<ResolversTypes['AddItemToCartResponse'], ParentType, ContextType, RequireFields<MutationaddItemToCartArgs, 'input'>>;
  clearCart?: Resolver<ResolversTypes['ClearCartResponse'], ParentType, ContextType, RequireFields<MutationclearCartArgs, 'input'>>;
  createChat?: Resolver<ResolversTypes['Chat'], ParentType, ContextType, RequireFields<MutationcreateChatArgs, 'input'>>;
  rateProduct?: Resolver<ResolversTypes['RateProductResponse'], ParentType, ContextType, RequireFields<MutationrateProductArgs, 'input'>>;
  sendChatMessage?: Resolver<ResolversTypes['ChatMessage'], ParentType, ContextType, RequireFields<MutationsendChatMessageArgs, 'input'>>;
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

export type ProductListResponseResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['ProductListResponse'] = ResolversParentTypes['ProductListResponse']> = {
  pagination?: Resolver<ResolversTypes['PaginationResult'], ParentType, ContextType>;
  result?: Resolver<Array<ResolversTypes['Product']>, ParentType, ContextType>;
};

export type ProductRatingResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['ProductRating'] = ResolversParentTypes['ProductRating']> = {
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  creatorUserId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  rating?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
};

export type ProductRatingByProductIdsResponseResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['ProductRatingByProductIdsResponse'] = ResolversParentTypes['ProductRatingByProductIdsResponse']> = {
  result?: Resolver<Array<ResolversTypes['Product_Rating']>, ParentType, ContextType>;
};

export type ProductRatingsResponseResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['ProductRatingsResponse'] = ResolversParentTypes['ProductRatingsResponse']> = {
  pagination?: Resolver<ResolversTypes['PaginationResult'], ParentType, ContextType>;
  ratings?: Resolver<Array<ResolversTypes['ProductRating']>, ParentType, ContextType>;
};

export type Product_RatingResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['Product_Rating'] = ResolversParentTypes['Product_Rating']> = {
  average?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
};

export type ProductsByIdsResponseResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['ProductsByIdsResponse'] = ResolversParentTypes['ProductsByIdsResponse']> = {
  result?: Resolver<Array<Maybe<ResolversTypes['Product']>>, ParentType, ContextType>;
};

export type QueryResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  cart?: Resolver<ResolversTypes['CartResponse'], ParentType, ContextType, RequireFields<QuerycartArgs, 'id'>>;
  productList?: Resolver<ResolversTypes['ProductListResponse'], ParentType, ContextType, RequireFields<QueryproductListArgs, 'filter' | 'pagination'>>;
  productRatingByProductIds?: Resolver<ResolversTypes['ProductRatingByProductIdsResponse'], ParentType, ContextType, RequireFields<QueryproductRatingByProductIdsArgs, 'ids'>>;
  productRatings?: Resolver<ResolversTypes['ProductRatingsResponse'], ParentType, ContextType, RequireFields<QueryproductRatingsArgs, 'filter' | 'pagination'>>;
  productsByIds?: Resolver<ResolversTypes['ProductsByIdsResponse'], ParentType, ContextType, RequireFields<QueryproductsByIdsArgs, 'ids'>>;
};

export type RateProductResponseResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['RateProductResponse'] = ResolversParentTypes['RateProductResponse']> = {
  result?: Resolver<ResolversTypes['Product_Rating'], ParentType, ContextType>;
};

export type Resolvers<ContextType = ResolverContext> = {
  AddItemToCartResponse?: AddItemToCartResponseResolvers<ContextType>;
  Cart?: CartResolvers<ContextType>;
  CartItem?: CartItemResolvers<ContextType>;
  CartResponse?: CartResponseResolvers<ContextType>;
  Chat?: ChatResolvers<ContextType>;
  ChatMessage?: ChatMessageResolvers<ContextType>;
  ChatMessagesResponse?: ChatMessagesResponseResolvers<ContextType>;
  ClearCartResponse?: ClearCartResponseResolvers<ContextType>;
  DateTime?: GraphQLScalarType;
  Mutation?: MutationResolvers<ContextType>;
  PaginationResult?: PaginationResultResolvers<ContextType>;
  Product?: ProductResolvers<ContextType>;
  ProductListResponse?: ProductListResponseResolvers<ContextType>;
  ProductRating?: ProductRatingResolvers<ContextType>;
  ProductRatingByProductIdsResponse?: ProductRatingByProductIdsResponseResolvers<ContextType>;
  ProductRatingsResponse?: ProductRatingsResponseResolvers<ContextType>;
  Product_Rating?: Product_RatingResolvers<ContextType>;
  ProductsByIdsResponse?: ProductsByIdsResponseResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  RateProductResponse?: RateProductResponseResolvers<ContextType>;
};

