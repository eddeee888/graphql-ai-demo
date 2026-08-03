/* This file was automatically generated. DO NOT UPDATE MANUALLY. */
    import type   { Resolvers } from './types.generated';
    import    { cart as Query_cart } from './cart/resolvers/Query/cart';
import    { productList as Query_productList } from './product/resolvers/Query/productList';
import    { productRatingByProductIds as Query_productRatingByProductIds } from './product-rating/resolvers/Query/productRatingByProductIds';
import    { productRatings as Query_productRatings } from './product-rating/resolvers/Query/productRatings';
import    { productsByIds as Query_productsByIds } from './product/resolvers/Query/productsByIds';
import    { addItemToCart as Mutation_addItemToCart } from './cart/resolvers/Mutation/addItemToCart';
import    { clearCart as Mutation_clearCart } from './cart/resolvers/Mutation/clearCart';
import    { createChat as Mutation_createChat } from './chat/resolvers/Mutation/createChat';
import    { rateProduct as Mutation_rateProduct } from './product-rating/resolvers/Mutation/rateProduct';
import    { sendChatMessage as Mutation_sendChatMessage } from './chat/resolvers/Mutation/sendChatMessage';
import    { DateTimeResolver } from 'graphql-scalars';
    export const resolvers: Resolvers = {
      Query: { cart: Query_cart,productList: Query_productList,productRatingByProductIds: Query_productRatingByProductIds,productRatings: Query_productRatings,productsByIds: Query_productsByIds },
      Mutation: { addItemToCart: Mutation_addItemToCart,clearCart: Mutation_clearCart,createChat: Mutation_createChat,rateProduct: Mutation_rateProduct,sendChatMessage: Mutation_sendChatMessage },
      
      DateTime: DateTimeResolver
    }