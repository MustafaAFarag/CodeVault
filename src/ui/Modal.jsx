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
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
      <div className="bg-background p-8 rounded-lg shadow-lg max-w-lg w-full">
        <h2 className="text-3xl font-bold text-secondary mb-6 text-center">
          {title}
        </h2>
        <form onSubmit={onSubmit}>
          {children}
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className={`bg-error px-5 py-2 rounded-md shadow-md transition-all mr-3 ${
                isSubmitting
                  ? 'bg-opacity-50 cursor-not-allowed'
                  : 'hover:bg-opacity-80'
              }`}
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`bg-accent text-white px-5 py-2 rounded-md shadow-md transition-all ${
                isSubmitting
                  ? 'bg-opacity-50 cursor-not-allowed'
                  : 'hover:bg-opacity-80'
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
