/* eslint-disable react/prop-types */

import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

function NoteCard({ note }) {
  const { title, description, file_url, rating } = note;

  const renderRatingStars = () => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    return (
      <>
        {Array(fullStars)
          .fill()
          .map((_, index) => (
            <FaStar key={`full-${index}`} className="text-yellow-500" />
          ))}
        {hasHalfStar && <FaStarHalfAlt className="text-yellow-500" />}
        {Array(5 - fullStars - (hasHalfStar ? 1 : 0))
          .fill()
          .map((_, index) => (
            <FaRegStar key={`empty-${index}`} className="text-gray-300" />
          ))}
      </>
    );
  };

  return (
    <div className="bg-gray-800 text-white p-4 rounded-md shadow-md">
      <h2 className="text-xl font-semibold">{title}</h2>
      <p className="text-gray-300">{description}</p>
      <a
        href={file_url}
        className="text-blue-400 hover:underline"
        target="_blank"
        rel="noopener noreferrer"
      >
        View Note
      </a>
      <div className="mt-2 flex items-center">{renderRatingStars()}</div>
    </div>
  );
}

export default NoteCard;
