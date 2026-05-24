interface DatabaseCart {
  id: string; // userId
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

  getCart(userId: string): DatabaseCart {
    let cart = this.data[userId];
    if (!cart) {
      this.data[userId] = {
        id: userId,
        items: [],
      };
      cart = this.data[userId];
    }

    return cart;
  }

  addItemToCart({
    userId,
    productId,
    count,
  }: {
    userId: string;
    productId: string;
    count: number;
  }): DatabaseCart {
    let cart = this.data[userId];
    if (!cart) {
      this.data[userId] = {
        id: userId,
        items: [],
      };
      cart = this.data[userId];
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

  clearCart(userId: string): DatabaseCart {
    if (!this.data[userId]) {
      this.data[userId] = {
        id: userId,
        items: [],
      };
    }

    const cart = this.data[userId];

    cart.items = [];

    return cart;
  }
}
