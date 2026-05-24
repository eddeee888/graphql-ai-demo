/* This file was automatically generated. DO NOT UPDATE MANUALLY. */
    import type   { Resolvers } from './types.generated';
    import    { cart as Query_cart } from './cart/resolvers/Query/cart';
import    { productList as Query_productList } from './product/resolvers/Query/productList';
import    { productRatingByProductIds as Query_productRatingByProductIds } from './product-rating/resolvers/Query/productRatingByProductIds';
import    { productsByIds as Query_productsByIds } from './product/resolvers/Query/productsByIds';
import    { addItemToCart as Mutation_addItemToCart } from './cart/resolvers/Mutation/addItemToCart';
import    { clearCart as Mutation_clearCart } from './cart/resolvers/Mutation/clearCart';
import    { rateProduct as Mutation_rateProduct } from './product-rating/resolvers/Mutation/rateProduct';
    export const resolvers: Resolvers = {
      Query: { cart: Query_cart,productList: Query_productList,productRatingByProductIds: Query_productRatingByProductIds,productsByIds: Query_productsByIds },
      Mutation: { addItemToCart: Mutation_addItemToCart,clearCart: Mutation_clearCart,rateProduct: Mutation_rateProduct },
      
      
    }