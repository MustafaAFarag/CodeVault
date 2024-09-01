/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import { FaTrash } from 'react-icons/fa';
import { memo } from 'react';
import SpinnerMini from '../../ui/SpinnerMini';

const SheetItem = memo(({ sheet, user, handleDeleteSheet, isDeleting }) => {
  const isAdmin =
    user && (user.role === 'admin' || user.role === 'super_admin');

  return (
    <div className="relative flex h-full flex-col rounded-lg border border-gray-200 bg-white p-4 shadow-md transition-all duration-300">
      <div className="mt-5 flex flex-col items-start lg:flex-row lg:items-center lg:justify-between">
        <h2 className="mb-2 text-lg font-semibold text-teal-600 md:text-2xl">
          {sheet.title}
        </h2>

        {isAdmin && (
          <button
            onClick={handleDeleteSheet}
            className="z-20 -translate-y-2 rounded-full border border-blue-300 bg-blue-50 p-2 text-blue-500 shadow-md transition-all duration-300 hover:bg-blue-100"
            aria-label="Delete sheet"
            disabled={isDeleting}
          >
            {isDeleting ? <SpinnerMini /> : <FaTrash />}
          </button>
        )}
      </div>

      <p className="mb-4 text-sm text-gray-700 md:text-xl">
        {sheet.description || 'No description available '}
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
