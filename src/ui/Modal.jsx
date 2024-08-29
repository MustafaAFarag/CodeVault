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
      {/* Attach the ref to the modal container */}
      <div className="w-full max-w-lg rounded-lg bg-white p-8 shadow-xl">
        <h2 className="mb-6 text-center text-3xl font-semibold text-teal-700">
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
