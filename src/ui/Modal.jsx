/* eslint-disable react/prop-types */
import { useOutsideClick } from '../hooks/useOutsideClick';

function Modal({
  isOpen,
  onClose,
  onSubmit,
  title,
  children,
  isSubmitting,
  submitText = 'Submit',
}) {
  const modalRef = useOutsideClick(onClose);
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm z-50">
      {/* Attach the ref to the modal container */}
      <div
        ref={modalRef}
        className="bg-white p-8 rounded-lg shadow-xl max-w-lg w-full"
      >
        <h2 className="text-3xl font-semibold text-teal-700 mb-6 text-center">
          {title}
        </h2>
        <form onSubmit={onSubmit}>
          {children}
          <div className="flex justify-end mt-4">
            <button
              type="button"
              onClick={onClose}
              className={`bg-gray-300 text-gray-700 px-4 py-2 rounded-md transition-all mr-3 text-xl ${
                isSubmitting
                  ? 'opacity-50 cursor-not-allowed'
                  : 'hover:bg-gray-400'
              }`}
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`bg-teal-500 text-white text-xl px-4 py-2 rounded-md shadow-md transition-all ${
                isSubmitting
                  ? 'opacity-50 cursor-not-allowed'
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
