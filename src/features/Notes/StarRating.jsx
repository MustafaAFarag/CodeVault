/* eslint-disable react/prop-types */
import { useState } from 'react';
import { FaStar } from 'react-icons/fa';

function StarRating({ rating, onRatingChange }) {
  const [hoveredRating, setHoveredRating] = useState(null);

  return (
    <div className="flex items-center gap-2 mt-4 justify-center">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          onClick={() => onRatingChange(star)}
          onMouseEnter={() => setHoveredRating(star)}
          onMouseLeave={() => setHoveredRating(null)}
          className={`p-1 ${
            star <= (hoveredRating || rating || 0)
              ? 'text-yellow-500'
              : 'text-gray-500'
          } hover:text-yellow-300 transition-colors duration-200`}
        >
          <FaStar className="w-5 h-5" />
        </button>
      ))}
    </div>
  );
}

export default StarRating;
