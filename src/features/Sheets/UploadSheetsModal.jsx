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
          className="mb-2 block text-lg font-semibold text-teal-600"
        >
          Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formValues.title}
          onChange={handleChange}
          className="w-full rounded-md border border-gray-300 bg-gray-50 px-4 py-2 text-xl transition duration-200 focus:outline-none focus:ring-2 focus:ring-teal-500"
          placeholder="Enter the title"
          disabled={isUploading}
        />
      </div>

      {/* Description Input */}
      <div className="mb-5">
        <label
          htmlFor="description"
          className="mb-2 block text-lg font-semibold text-teal-600"
        >
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={formValues.description}
          onChange={handleChange}
          className="w-full rounded-md border border-gray-300 bg-gray-50 px-4 py-2 text-xl transition duration-200 focus:outline-none focus:ring-2 focus:ring-teal-500"
          placeholder="Enter a description"
          rows="4"
          disabled={isUploading}
        />
      </div>

      {/* Subject Dropdown */}
      <div className="mb-5">
        <label
          htmlFor="subject_id"
          className="mb-2 block text-lg font-semibold text-teal-600"
        >
          Subject
        </label>
        <select
          id="subject_id"
          name="subject_id"
          value={formValues.subject_id}
          onChange={handleChange}
          className="w-full rounded-md border border-gray-300 bg-gray-50 px-4 py-2 text-xl transition duration-200 focus:outline-none focus:ring-2 focus:ring-teal-500"
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
          className="mb-2 block text-lg font-semibold text-teal-600"
        >
          Upload {title} PDF
        </label>
        <input
          type="file"
          id="pdf"
          name="url"
          onChange={handleChange}
          className="w-full rounded-md border border-gray-300 bg-gray-50 px-4 py-2 text-xl transition duration-200 focus:outline-none focus:ring-2 focus:ring-teal-500"
          disabled={isUploading}
        />
      </div>
    </Modal>
  );
}

export default UploadSheetsModal;
