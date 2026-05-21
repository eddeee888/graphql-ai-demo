/* This file was automatically generated. DO NOT UPDATE MANUALLY. */
    import type   { Resolvers } from './types.generated';
    import    { product as Query_product } from './product/resolvers/Query/product';
import    { Product } from './product/resolvers/Product';
import    { ProductResponseSuccess } from './product/resolvers/ProductResponseSuccess';
import    { ResponseError } from './base/resolvers/ResponseError';
    export const resolvers: Resolvers = {
      Query: { product: Query_product },
      
      
      Product: Product,
ProductResponseSuccess: ProductResponseSuccess,
ResponseError: ResponseError
    }