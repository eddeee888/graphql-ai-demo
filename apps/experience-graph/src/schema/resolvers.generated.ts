/* This file was automatically generated. DO NOT UPDATE MANUALLY. */
    import type   { Resolvers } from './types.generated';
    import    { agentChat as Query_agentChat } from './agent/resolvers/Query/agentChat';
import    { cart as Query_cart } from './product/resolvers/Query/cart';
import    { product as Query_product } from './product/resolvers/Query/product';
import    { products as Query_products } from './product/resolvers/Query/products';
import    { addItemToCart as Mutation_addItemToCart } from './product/resolvers/Mutation/addItemToCart';
import    { clearCart as Mutation_clearCart } from './product/resolvers/Mutation/clearCart';
import    { rateProduct as Mutation_rateProduct } from './product/resolvers/Mutation/rateProduct';
import    { sendAgentChatMessage as Mutation_sendAgentChatMessage } from './agent/resolvers/Mutation/sendAgentChatMessage';
import    { agentChatUpdates as Subscription_agentChatUpdates } from './agent/resolvers/Subscription/agentChatUpdates';
import    { cartUpdates as Subscription_cartUpdates } from './product/resolvers/Subscription/cartUpdates';
import    { CartItem } from './product/resolvers/CartItem';
import    { ChatMessage } from './agent/resolvers/ChatMessage';
import    { Product } from './product/resolvers/Product';
import    { DateTimeResolver } from 'graphql-scalars';
    export const resolvers: Resolvers = {
      Query: { agentChat: Query_agentChat,cart: Query_cart,product: Query_product,products: Query_products },
      Mutation: { addItemToCart: Mutation_addItemToCart,clearCart: Mutation_clearCart,rateProduct: Mutation_rateProduct,sendAgentChatMessage: Mutation_sendAgentChatMessage },
      Subscription: { agentChatUpdates: Subscription_agentChatUpdates,cartUpdates: Subscription_cartUpdates },
      CartItem: CartItem,
ChatMessage: ChatMessage,
Product: Product,
DateTime: DateTimeResolver
    }