/* eslint-disable react/prop-types */

function Modal({
  isOpen,
  onClose,
  onSubmit,
  title,
  children,
  isSubmitting,
  submitText = 'Submit',
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm">
      <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-lg bg-white p-6 shadow-xl sm:max-w-md sm:p-4 md:p-6 lg:max-w-lg lg:p-8">
        <h2 className="mb-4 text-center text-2xl font-semibold text-teal-700 sm:text-xl lg:text-3xl">
          {title}
        </h2>
        <form onSubmit={onSubmit}>
          {children}
          <div className="mt-4 flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className={`mr-3 rounded-md bg-gray-300 px-4 py-2 text-xl text-gray-700 transition-all ${
                isSubmitting
                  ? 'cursor-not-allowed opacity-50'
                  : 'hover:bg-gray-400'
              }`}
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`rounded-md bg-teal-500 px-4 py-2 text-xl text-white shadow-md transition-all ${
                isSubmitting
                  ? 'cursor-not-allowed opacity-50'
                  : 'hover:bg-teal-600'
              }`}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : submitText}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Modal;
