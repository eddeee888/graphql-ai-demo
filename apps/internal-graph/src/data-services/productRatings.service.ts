import { randomUUID } from 'node:crypto';
import {
  createPaginatedResult,
  type PaginatedResult,
} from './utils/createPaginatedResult';

interface DatabaseProductRating {
  id: string;
  productId: string;
  creatorUserId: string;
  rating: number;
  createdAt: Date;
}

const data: Record<string, DatabaseProductRating> = {
  '79a2039d-fc23-4df4-bc46-e81cff1e7ae5': {
    id: '79a2039d-fc23-4df4-bc46-e81cff1e7ae5',
    productId: 'product-1',
    creatorUserId: 'user-1',
    rating: 5,
    createdAt: new Date('2026-01-01T00:00:00.000Z'),
  },
  'a5a49510-4aaa-4396-aa8b-f8d4dd4b0767': {
    id: 'a5a49510-4aaa-4396-aa8b-f8d4dd4b0767',
    productId: 'product-1',
    creatorUserId: 'user-1',
    rating: 4,
    createdAt: new Date('2026-01-02T00:00:00.000Z'),
  },
  '09331f7b-bae1-4462-91ee-a794e8e5d58e': {
    id: '09331f7b-bae1-4462-91ee-a794e8e5d58e',
    productId: 'product-2',
    creatorUserId: 'user-1',
    rating: 1,
    createdAt: new Date('2026-01-01T00:00:00.000Z'),
  },
  '98ba3000-5405-4233-9f89-8db774ca9bd3': {
    id: '98ba3000-5405-4233-9f89-8db774ca9bd3',
    productId: 'product-2',
    creatorUserId: 'user-1',
    rating: 2,
    createdAt: new Date('2026-01-02T00:00:00.000Z'),
  },
};

export class ProductRatingsService {
  private data: Record<string, DatabaseProductRating>;
  constructor() {
    this.data = data;
  }

  getRatingAvgByProductIds(productIds: string[]): number[] {
    const result: number[] = [];

    for (const id of productIds) {
      const ratings = Object.values(this.data).filter(
        (rating) => rating.productId === id,
      );

      if (ratings.length === 0) {
        result.push(0);
        continue;
      }

      result.push(
        ratings.reduce((sum, rating) => sum + rating.rating, 0) /
          ratings.length,
      );
    }

    return result;
  }

  rateProduct({
    creatorUserId,
    productId,
    rating,
  }: {
    creatorUserId: string;
    productId: string;
    rating: number;
  }): number {
    const id = randomUUID();
    this.data[id] = {
      id: randomUUID(),
      productId,
      creatorUserId,
      rating,
      createdAt: new Date(),
    };

    return this.getRatingAvgByProductIds([productId])[0];
  }

  getRatings({
    filter,
    pagination,
  }: {
    filter: {
      from: Date;
      to: Date;
    };
    pagination: {
      page?: number | null;
      pageSize?: number | null;
    };
  }): PaginatedResult<DatabaseProductRating> {
    const ratings = Object.values(this.data).filter(
      (rating) =>
        rating.createdAt >= filter.from && rating.createdAt <= filter.to,
    );

    return createPaginatedResult({
      items: ratings,
      page: pagination.page || 1,
      pageSize: pagination.pageSize || 10,
    });
  }
}
