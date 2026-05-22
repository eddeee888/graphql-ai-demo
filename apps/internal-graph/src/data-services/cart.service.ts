export interface DatabaseCart {
  id: string;
  items: { productId: string; count: number }[];
}

const data: Record<string, DatabaseCart> = {
  'user-1': {
    id: 'user-1',
    items: [],
  },
};

export class CartsService {
  private data: Record<string, DatabaseCart>;
  constructor() {
    this.data = data;
  }

  getCart(userId: string): DatabaseCart | undefined {
    return this.data[userId];
  }

  addItemToCart({
    userId,
    productId,
    count,
  }: {
    userId: string;
    productId: string;
    count: number;
  }): DatabaseCart | undefined {
    const cart = this.data[userId];
    if (!cart) {
      return;
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.productId === productId,
    );

    if (itemIndex === -1) {
      cart.items.push({ productId, count });
      return cart;
    }

    cart.items[itemIndex].count += count;

    return cart;
  }
}
