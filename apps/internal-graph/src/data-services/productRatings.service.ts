interface ProductRating {
  productId: string;
  ratings: { creatorActorId: string; rating: number; createdAt: Date }[];
}

const data: Record<string, ProductRating> = {
  'product-1': {
    productId: 'product-1',
    ratings: [
      {
        creatorActorId: 'user-1',
        rating: 5,
        createdAt: new Date('2026-01-01T00:00:00.000Z'),
      },
      {
        creatorActorId: 'user-1',
        rating: 4,
        createdAt: new Date('2026-01-02T00:00:00.000Z'),
      },
    ],
  },
  'product-2': {
    productId: 'product-2',
    ratings: [
      {
        creatorActorId: 'user-1',
        rating: 1,
        createdAt: new Date('2026-01-01T00:00:00.000Z'),
      },
      {
        creatorActorId: 'user-1',
        rating: 2,
        createdAt: new Date('2026-01-02T00:00:00.000Z'),
      },
    ],
  },
};

export class ProductRatingsService {
  private data: Record<string, ProductRating>;
  constructor() {
    this.data = data;
  }

  getRatingAvgByProductIds(productIds: string[]): number[] {
    const result: number[] = [];

    for (const id of productIds) {
      const product = this.data[id];
      if (!product) {
        result.push(0);
        continue;
      }

      if (product.ratings.length === 0) {
        result.push(0);
        continue;
      }

      result.push(
        product.ratings.reduce((sum, rating) => sum + rating.rating, 0) /
          product.ratings.length,
      );
    }

    return result;
  }

  rateProduct({
    creatorActorId,
    productId,
    rating,
  }: {
    creatorActorId: string;
    productId: string;
    rating: number;
  }): number {
    if (!this.data[productId]) {
      this.data[productId] = {
        productId,
        ratings: [],
      };
    }

    const product = this.data[productId];

    product.ratings.push({
      creatorActorId,
      rating,
      createdAt: new Date(),
    });

    return this.getRatingAvgByProductIds([productId])[0];
  }
}
