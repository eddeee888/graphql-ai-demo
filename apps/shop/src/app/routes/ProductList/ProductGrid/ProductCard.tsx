import { StarRating } from '../../../components/StarRating';

export interface Product {
  id: string;
  rating: number;
  inStock: boolean;
  name: string;
  imageUrl: string;
  category: string;
  reviewCount: number;
  price: number;
}

interface ProductCardProps {
  product: Product;
  onProductClick: (product: Product) => void;
}

export function ProductCard({ product, onProductClick }: ProductCardProps) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onProductClick(product);
    }
  };

  console.log(product.inStock);

  return (
    <div
      className={`
        group
        border rounded-lg cursor-pointer overflow-hidden
        bg-white h-full
        flex flex-col
        transition-all duration-300 ease-in-out
        hover:-translate-y-1 hover:shadow-md
        focus:outline focus:outline-offset-2 focus:outline-2 focus:outline-blue-400
        ${!product.inStock ? 'opacity-70' : ''}`}
      onClick={() => onProductClick(product)}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`View details for ${product.name}`}
    >
      <div className="relative w-full h-52 overflow-hidden bg-gray-100">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition duration-300 ease-in-out"
        />
        {!product.inStock && (
          <div
            className="
              absolute top-0 bottom-0 left-0 right-0 
              bg-black/70 text-white font-bold text-lg
              flex items-center justify-center
            "
          >
            Out of Stock
          </div>
        )}
      </div>
      <div className="p-4 flex flex-col">
        <h3 className="text-lg text-gray-700 mb-2 text-ellipsis line-clamp-2">
          {product.name}
        </h3>
        <p className="text-sm text-gray-500 mb-3">{product.category}</p>
        <div className="text-sm text-gray-500 flex gap-2 mb-3 items-center">
          <StarRating rating={product.rating} />
          <span className="text-sm text-gray-400">({product.reviewCount})</span>
        </div>
        <div className="text-lg font-bold text-gray-700 mt-auto">
          ${product.price.toFixed(2)}
        </div>
      </div>
    </div>
  );
}
