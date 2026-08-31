import React from 'react';
import { Star } from 'lucide-react';

interface RatingStarsProps {
  rating: number;
  maxStars?: number;
  size?: number;
  showValue?: boolean;
  reviewsCount?: number;
  interactive?: boolean;
  onChange?: (rating: number) => void;
  className?: string;
}

export const RatingStars: React.FC<RatingStarsProps> = ({
  rating,
  maxStars = 5,
  size = 14,
  showValue = false,
  reviewsCount,
  interactive = false,
  onChange,
  className = ''
}) => {
  return (
    <div className={`inline-flex items-center gap-1 ${className}`}>
      <div className="flex items-center gap-0.5">
        {Array.from({ length: maxStars }).map((_, index) => {
          const starValue = index + 1;
          const isFilled = rating >= starValue;
          const isHalf = !isFilled && rating >= index + 0.5;

          return (
            <button
              type="button"
              key={index}
              disabled={!interactive}
              onClick={() => interactive && onChange && onChange(starValue)}
              className={`p-0.5 transition-transform ${interactive ? 'cursor-pointer hover:scale-125 active:scale-95' : 'cursor-default'}`}
            >
              <Star
                size={size}
                className={`${
                  isFilled
                    ? 'text-amber-400 fill-amber-400'
                    : isHalf
                    ? 'text-amber-400 fill-amber-400/50'
                    : 'text-neutral-200 fill-neutral-100'
                }`}
              />
            </button>
          );
        })}
      </div>
      {showValue && (
        <span className="text-xs font-bold text-neutral-800 ml-0.5">
          {rating.toFixed(2)}
        </span>
      )}
      {reviewsCount !== undefined && (
        <span className="text-xs text-neutral-500 font-normal">
          ({reviewsCount})
        </span>
      )}
    </div>
  );
};
