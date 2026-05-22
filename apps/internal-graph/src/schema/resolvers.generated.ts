/* This file was automatically generated. DO NOT UPDATE MANUALLY. */
    import type   { Resolvers } from './types.generated';
    import    { cart as Query_cart } from './cart/resolvers/Query/cart';
import    { product as Query_product } from './product/resolvers/Query/product';
import    { productRating as Query_productRating } from './product-rating/resolvers/Query/productRating';
import    { products as Query_products } from './product/resolvers/Query/products';
import    { rateProduct as Mutation_rateProduct } from './product-rating/resolvers/Mutation/rateProduct';
import    { Product } from './product/resolvers/Product';
    export const resolvers: Resolvers = {
      Query: { cart: Query_cart,product: Query_product,productRating: Query_productRating,products: Query_products },
      Mutation: { rateProduct: Mutation_rateProduct },
      
      Product: Product
    }