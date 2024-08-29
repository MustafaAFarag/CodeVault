/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import { FaTrash, FaStar } from 'react-icons/fa';
import { memo } from 'react';

const SheetItem = memo(({ sheet, user, isBestSheet, handleDeleteSheet }) => {
  const canDelete =
    user &&
    (user.role === 'admin' ||
      user.role === 'super_admin' ||
      sheet.user_id === user.id);

  return (
    <div className="relative flex h-full flex-col rounded-lg border border-gray-200 bg-white p-4 shadow-md transition-all duration-300">
      {isBestSheet && (
        <div className="absolute right-0 top-0 z-10 rounded-bl-lg bg-teal-400 px-2 py-1 text-sm font-bold text-white md:text-xl">
          Best Sheet
        </div>
      )}

      <h2 className="mb-2 text-lg font-semibold text-teal-600 sm:mt-3 md:text-2xl">
        {sheet.title}
      </h2>

      <div className="mb-2 flex items-center justify-between">
        <div className="text-md mb-2 flex items-center md:text-xl">
          {sheet.average_rating !== null && (
            <FaStar className="mr-1 -translate-y-[0.15rem] text-yellow-400" />
          )}
          <p className="md:text-md text-sm text-gray-600">
            {sheet.average_rating !== null
              ? sheet.average_rating
              : 'No ratings yet'}
          </p>
        </div>

        {canDelete && (
          <button
            onClick={handleDeleteSheet}
            className="z-20 rounded-full border border-red-300 bg-red-50 p-2 text-red-500 shadow-md transition-all duration-300 hover:bg-red-100"
            aria-label="Delete sheet"
          >
            <FaTrash />
          </button>
        )}
      </div>

      <p className="mb-4 text-sm text-gray-700 md:text-xl">
        {sheet.description || 'No description available'}
      </p>

      <p className="mb-4 mt-auto text-sm text-gray-500 md:text-xl">
        Author: {sheet.author || 'Unknown'}
      </p>

      <a
        href={sheet.url}
        target="_blank"
        rel="noopener noreferrer"
        className="mb-5 mt-auto block rounded-lg bg-secondary px-3 py-2 text-center text-sm font-semibold text-text transition-all duration-300 hover:bg-accent md:px-5 md:py-3 md:text-xl"
      >
        View Sheet
      </a>
    </div>
  );
});

export default SheetItem;
