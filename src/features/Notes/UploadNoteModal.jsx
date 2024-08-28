/* eslint-disable react/prop-types */
import Modal from '../../ui/Modal';

function UploadNoteModal({
  isOpen,
  onClose,
  onSubmit,
  formValues,
  handleChange,
  isUploading,
}) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={onSubmit}
      title="Upload a New Note"
      isSubmitting={isUploading}
      submitText="Upload"
    >
      {/* Title Input */}
      <div className="mb-5">
        <label
          htmlFor="title"
          className="block text-sm font-semibold text-teal-600 mb-2"
        >
          Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formValues.title}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded-md bg-gray-50 border border-gray-300 text-gray-700 focus:ring-2 focus:ring-teal-500 focus:outline-none transition duration-200"
          placeholder="Enter the title"
          disabled={isUploading}
        />
      </div>

      {/* Description Input */}
      <div className="mb-5">
        <label
          htmlFor="description"
          className="block text-sm font-semibold text-teal-600 mb-2"
        >
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={formValues.description}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded-md bg-gray-50 border border-gray-300 text-gray-700 focus:ring-2 focus:ring-teal-500 focus:outline-none transition duration-200"
          placeholder="Enter the description"
          disabled={isUploading}
          rows="4"
        ></textarea>
      </div>

      {/* File Input */}
      <div className="mb-5">
        <label
          htmlFor="pdf"
          className="block text-sm font-semibold text-teal-600 mb-2"
        >
          Upload PDF
        </label>
        <input
          type="file"
          id="pdf"
          name="pdf"
          onChange={handleChange}
          className="w-full px-4 py-2 rounded-md bg-gray-50 border border-gray-300 text-gray-700 focus:ring-2 focus:ring-teal-500 focus:outline-none transition duration-200"
          disabled={isUploading}
        />
      </div>
    </Modal>
  );
}

export default UploadNoteModal;
