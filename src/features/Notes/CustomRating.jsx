/* eslint-disable react/prop-types */
import { useState } from 'react';
import { FaStar } from 'react-icons/fa';

function CustomRating({ value, onChange, max = 5 }) {
  const [hover, setHover] = useState(null);

  const handleRating = (rating) => {
    if (onChange) {
      onChange(rating);
    }
  };

  return (
    <div className="flex">
      {[...Array(max)].map((_, index) => {
        const ratingValue = index + 1;
        return (
          <label key={index} className="cursor-pointer">
            <input
              type="radio"
              name="rating"
              value={ratingValue}
              onClick={() => handleRating(ratingValue)}
              className="hidden"
            />
            <FaStar
              className={`mr-1 h-5 w-5 transition-colors duration-200 md:h-7 md:w-7 ${
                ratingValue <= (hover || value)
                  ? hover
                    ? 'text-yellow-300' // Hover color
                    : 'text-yellow-400' // Submitted rating color
                  : 'text-gray-300' // Unrated color
              }`}
              onMouseEnter={() => setHover(ratingValue)}
              onMouseLeave={() => setHover(null)}
            />
          </label>
        );
      })}
    </div>
  );
}

export default CustomRating;
