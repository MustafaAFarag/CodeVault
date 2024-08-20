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
              className={`w-6 h-6 mr-1 transition-colors duration-200 
                ${
                  ratingValue <= (hover || value)
                    ? hover
                      ? 'text-yellow-200' // Hover color
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
