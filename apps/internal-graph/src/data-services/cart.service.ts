export interface DatabaseCart {
  id: string;
  items: { productId: string; count: number }[];
}

export class CartsService {
  private data: Record<string, DatabaseCart> = {
    'user-1': {
      id: 'user-1',
      items: [],
    },
  };

  getCart(userId: string): DatabaseCart | undefined {
    return this.data[userId];
  }
}
