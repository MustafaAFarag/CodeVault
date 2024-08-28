/* eslint-disable react/prop-types */
import Modal from '../../ui/Modal';

function UploadSheetsModal({
  isOpen,
  onClose,
  onSubmit,
  formValues,
  subjects,
  handleChange,
  isUploading,
  title,
}) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={onSubmit}
      title={`Upload a ${title} Sheet`}
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
          className="w-full px-4 py-2 rounded-md bg-gray-50 border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:outline-none transition duration-200"
          placeholder="Enter the title"
          disabled={isUploading}
        />
      </div>

      {/* Subject Dropdown */}
      <div className="mb-5">
        <label
          htmlFor="subject_id"
          className="block text-sm font-semibold text-teal-600 mb-2"
        >
          Subject
        </label>
        <select
          id="subject_id"
          name="subject_id"
          value={formValues.subject_id}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded-md bg-gray-50 border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:outline-none transition duration-200"
          disabled={isUploading}
        >
          <option value="">Select a subject</option>
          {subjects.map((subject) => (
            <option key={subject.id} value={subject.id}>
              {subject.name}
            </option>
          ))}
        </select>
      </div>

      {/* File Input */}
      <div className="mb-5">
        <label
          htmlFor="pdf"
          className="block text-sm font-semibold text-teal-600 mb-2"
        >
          Upload {title} PDF
        </label>
        <input
          type="file"
          id="pdf"
          name="url"
          onChange={handleChange}
          className="w-full px-4 py-2 rounded-md bg-gray-50 border border-gray-300 focus:ring-2 focus:ring-teal-500  focus:outline-none transition duration-200"
          disabled={isUploading}
        />
      </div>
    </Modal>
  );
}

export default UploadSheetsModal;
