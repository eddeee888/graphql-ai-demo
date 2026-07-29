/* This file was automatically generated. DO NOT UPDATE MANUALLY. */
    import type   { Resolvers } from './types.generated';
    import    { cart as Query_cart } from './product/resolvers/Query/cart';
import    { product as Query_product } from './product/resolvers/Query/product';
import    { products as Query_products } from './product/resolvers/Query/products';
import    { addItemToCart as Mutation_addItemToCart } from './product/resolvers/Mutation/addItemToCart';
import    { clearCart as Mutation_clearCart } from './product/resolvers/Mutation/clearCart';
import    { rateProduct as Mutation_rateProduct } from './product/resolvers/Mutation/rateProduct';
import    { startAgentChat as Mutation_startAgentChat } from './agent/resolvers/Mutation/startAgentChat';
import    { agentChatUpdates as Subscription_agentChatUpdates } from './agent/resolvers/Subscription/agentChatUpdates';
import    { cartUpdates as Subscription_cartUpdates } from './product/resolvers/Subscription/cartUpdates';
import    { CartItem } from './product/resolvers/CartItem';
import    { Product } from './product/resolvers/Product';
    export const resolvers: Resolvers = {
      Query: { cart: Query_cart,product: Query_product,products: Query_products },
      Mutation: { addItemToCart: Mutation_addItemToCart,clearCart: Mutation_clearCart,rateProduct: Mutation_rateProduct,startAgentChat: Mutation_startAgentChat },
      Subscription: { agentChatUpdates: Subscription_agentChatUpdates,cartUpdates: Subscription_cartUpdates },
      CartItem: CartItem,
Product: Product
    }