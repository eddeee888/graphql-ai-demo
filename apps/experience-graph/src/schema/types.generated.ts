import { GraphQLResolveInfo } from 'graphql';
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

export type Product = {
  __typename?: 'Product';
  category: Scalars['String']['output'];
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  imageUrl: Scalars['String']['output'];
  inStock: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  price: Scalars['Float']['output'];
  rating: Scalars['Float']['output'];
  reviewCount: Scalars['Int']['output'];
};

export type ProductResponse = ProductResponseSuccess | ResponseError;

export type ProductResponseSuccess = {
  __typename?: 'ProductResponseSuccess';
  result?: Maybe<Product>;
};

export type Query = {
  __typename?: 'Query';
  product: ProductResponse;
};


export type QueryproductArgs = {
  id: Scalars['ID']['input'];
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



/** Mapping of union types */
export type ResolversUnionTypes<_RefType extends Record<string, unknown>> = {
  ProductResponse:
    | ( ProductResponseSuccess & { __typename: 'ProductResponseSuccess' } )
    | ( Omit<ResponseError, 'type'> & { type: _RefType['ResponseErrorType'] } & { __typename: 'ResponseError' } )
  ;
};


/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Product: ResolverTypeWrapper<Product>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  Float: ResolverTypeWrapper<Scalars['Float']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  ProductResponse: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['ProductResponse']>;
  ProductResponseSuccess: ResolverTypeWrapper<ProductResponseSuccess>;
  Query: ResolverTypeWrapper<Record<PropertyKey, never>>;
  ResponseError: ResolverTypeWrapper<Omit<ResponseError, 'type'> & { type: ResolversTypes['ResponseErrorType'] }>;
  ResponseErrorType: ResolverTypeWrapper<'SERVER_ERROR'>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Product: Product;
  String: Scalars['String']['output'];
  ID: Scalars['ID']['output'];
  Boolean: Scalars['Boolean']['output'];
  Float: Scalars['Float']['output'];
  Int: Scalars['Int']['output'];
  ProductResponse: ResolversUnionTypes<ResolversParentTypes>['ProductResponse'];
  ProductResponseSuccess: ProductResponseSuccess;
  Query: Record<PropertyKey, never>;
  ResponseError: ResponseError;
};

export type ProductResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['Product'] = ResolversParentTypes['Product']> = {
  category?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  imageUrl?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  inStock?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  price?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  rating?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  reviewCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
};

export type ProductResponseResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['ProductResponse'] = ResolversParentTypes['ProductResponse']> = {
  __resolveType?: TypeResolveFn<'ProductResponseSuccess' | 'ResponseError', ParentType, ContextType>;
};

export type ProductResponseSuccessResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['ProductResponseSuccess'] = ResolversParentTypes['ProductResponseSuccess']> = {
  result?: Resolver<Maybe<ResolversTypes['Product']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  product?: Resolver<ResolversTypes['ProductResponse'], ParentType, ContextType, RequireFields<QueryproductArgs, 'id'>>;
};

export type ResponseErrorResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['ResponseError'] = ResolversParentTypes['ResponseError']> = {
  type?: Resolver<ResolversTypes['ResponseErrorType'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ResponseErrorTypeResolvers = EnumResolverSignature<{ SERVER_ERROR?: any }, ResolversTypes['ResponseErrorType']>;

export type Resolvers<ContextType = ResolverContext> = {
  Product?: ProductResolvers<ContextType>;
  ProductResponse?: ProductResponseResolvers<ContextType>;
  ProductResponseSuccess?: ProductResponseSuccessResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  ResponseError?: ResponseErrorResolvers<ContextType>;
  ResponseErrorType?: ResponseErrorTypeResolvers;
};

