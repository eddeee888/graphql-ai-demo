interface StarRatingProps {
  rating: number;
  onClick?: (index: number) => void;
}

export const StarRating: React.FC<StarRatingProps> = ({ rating, onClick }) => {
  const getStars = () => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(i < Math.floor(rating));
    }
    return stars;
  };

  return (
    <span className="text-gray-300 text-lg flex gap-0.5">
      {getStars().map((filled, index) => (
        <span
          key={index}
          className={`
            ${filled ? 'text-orange-400' : ''}
            ${onClick ? 'cursor-pointer' : ''}
          `}
          onClick={() => onClick?.(index)}
        >
          ★
        </span>
      ))}
    </span>
  );
};
