/* This file was automatically generated. DO NOT UPDATE MANUALLY. */
    import type   { Resolvers } from './types.generated';
    import    { product as Query_product } from './product/resolvers/Query/product';
import    { products as Query_products } from './product/resolvers/Query/products';
import    { Product } from './product/resolvers/Product';
    export const resolvers: Resolvers = {
      Query: { product: Query_product,products: Query_products },
      
      
      Product: Product
    }