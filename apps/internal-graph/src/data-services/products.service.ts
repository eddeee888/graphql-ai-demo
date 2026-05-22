export interface DatabaseProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
  stockCount: number;
  reviewCount: number;
}

export class ProductsService {
  private data: Record<string, DatabaseProduct> = {
    'product-1': {
      id: 'product-1',
      name: 'Wireless Bluetooth Headphones',
      description:
        'Premium quality wireless headphones with active noise cancellation, 30-hour battery life, and superior sound quality.',
      price: 199.99,
      category: 'Electronics',
      imageUrl:
        'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500',
      stockCount: 5,
      reviewCount: 234,
    },
    'product-2': {
      id: 'product-2',
      name: 'Smart Watch Pro',
      description:
        'Advanced fitness tracking, heart rate monitoring, GPS, and smartphone integration in a sleek design.',
      price: 349.99,
      category: 'Electronics',
      imageUrl:
        'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500',
      stockCount: 10,
      reviewCount: 189,
    },
    'product-3': {
      id: 'product-3',
      name: 'Organic Cotton T-Shirt',
      description:
        'Comfortable and sustainable organic cotton t-shirt, perfect for everyday wear.',
      price: 29.99,
      category: 'Clothing',
      imageUrl:
        'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500',
      stockCount: 11,
      reviewCount: 92,
    },
    'product-4': {
      id: 'product-4',
      name: 'Stainless Steel Water Bottle',
      description:
        'Insulated water bottle that keeps drinks cold for 24 hours or hot for 12 hours.',
      price: 24.99,
      category: 'Home & Kitchen',
      imageUrl:
        'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500',
      stockCount: 4,
      reviewCount: 412,
    },
    'product-5': {
      id: 'product-5',
      name: 'Yoga Mat Premium',
      description:
        'Non-slip, eco-friendly yoga mat with extra cushioning for comfortable practice.',
      price: 45.99,
      category: 'Sports',
      imageUrl:
        'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=500',
      stockCount: 55,
      reviewCount: 156,
    },
    'product-6': {
      id: 'product-6',
      name: 'Portable Charger 20000mAh',
      description:
        'High-capacity power bank with fast charging and multiple USB ports.',
      price: 59.99,
      category: 'Electronics',
      imageUrl:
        'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=500',
      stockCount: 102,
      reviewCount: 298,
    },
    'product-7': {
      id: 'product-7',
      name: 'Running Shoes Elite',
      description:
        'Professional running shoes with advanced cushioning and breathable mesh upper.',
      price: 129.99,
      category: 'Sports',
      imageUrl:
        'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500',
      stockCount: 15,
      reviewCount: 523,
    },
    'product-8': {
      id: 'product-8',
      name: 'Coffee Maker Deluxe',
      description:
        'Programmable coffee maker with thermal carafe and customizable brew strength.',
      price: 89.99,
      category: 'Home & Kitchen',
      imageUrl:
        'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=500',
      stockCount: 67,
      reviewCount: 167,
    },
    'product-9': {
      id: 'product-9',
      name: 'Backpack Urban Explorer',
      description:
        'Durable and stylish backpack with laptop compartment and multiple pockets.',
      price: 79.99,
      category: 'Accessories',
      imageUrl:
        'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500',
      stockCount: 89,
      reviewCount: 201,
    },
    'product-10': {
      id: 'product-10',
      name: 'Wireless Keyboard and Mouse',
      description:
        'Ergonomic wireless keyboard and mouse combo with long battery life.',
      price: 69.99,
      category: 'Electronics',
      imageUrl:
        'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500',
      stockCount: 12,
      reviewCount: 145,
    },
    'product-11': {
      id: 'product-11',
      name: 'Sunglasses Polarized',
      description:
        'UV protection polarized sunglasses with stylish frame design.',
      price: 149.99,
      category: 'Accessories',
      imageUrl:
        'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500',
      stockCount: 555,
      reviewCount: 89,
    },
    'product-12': {
      id: 'product-12',
      name: 'Desk Lamp LED',
      description:
        'Adjustable LED desk lamp with touch controls and multiple brightness levels.',
      price: 39.99,
      category: 'Home & Kitchen',
      imageUrl:
        'https://images.unsplash.com/photo-1565306257569-4eb0e3c41b24?w=500',
      stockCount: 54,
      reviewCount: 276,
    },
  };

  getProducts({
    filter,
    pagination,
  }: {
    filter?: {
      category?: string | null;
      minPrice?: number | null;
      maxPrice?: number | null;
      inStock?: boolean | null;
      searchTerm?: string | null;
    };
    pagination: {
      page?: number | null;
      pageSize?: number | null;
    };
  }): {
    result: DatabaseProduct[];
    pagination: {
      page: number;
      pageSize: number;
      total: number;
      totalPages: number;
    };
  } {
    let filteredProducts = Object.values(this.data);

    // Apply filters
    if (filter) {
      if (filter.category) {
        filteredProducts = filteredProducts.filter(
          (p) => p.category === filter.category,
        );
      }
      if (filter.minPrice !== undefined && filter.minPrice !== null) {
        filteredProducts = filteredProducts.filter(
          (p) => p.price >= filter.minPrice!,
        );
      }
      if (filter.maxPrice !== undefined && filter.maxPrice !== null) {
        filteredProducts = filteredProducts.filter(
          (p) => p.price <= filter.maxPrice!,
        );
      }
      if (filter.inStock !== undefined) {
        filteredProducts = filteredProducts.filter((p) => p.stockCount > 0);
      }
      if (filter.searchTerm) {
        const searchLower = filter.searchTerm.toLowerCase();
        filteredProducts = filteredProducts.filter(
          (p) =>
            p.name.toLowerCase().includes(searchLower) ||
            p.description.toLowerCase().includes(searchLower) ||
            p.category.toLowerCase().includes(searchLower),
        );
      }
    }

    const page = pagination?.page || 1;
    const pageSize = pagination?.pageSize || 10;

    // Calculate pagination
    const total = filteredProducts.length;
    const totalPages = Math.ceil(total / pageSize);
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const items = filteredProducts.slice(startIndex, endIndex);

    return {
      result: items,
      pagination: {
        total,
        page,
        pageSize,
        totalPages,
      },
    };
  }

  getProductById(id: string): DatabaseProduct | undefined {
    return this.data[id];
  }
}
