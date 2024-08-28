/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import Modal from '../../ui/Modal';

function UploadNoteModal({
  isOpen,
  onClose,
  onSubmit,
  formValues,
  handleChange,
  isUploading,
  subjects,
  user,
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
      {/* Author Input */}
      <div className="mb-5">
        <label
          htmlFor="author"
          className="block text-lg font-semibold text-teal-600 mb-2"
        >
          Author
        </label>
        <input
          type="text"
          id="author"
          name="author"
          value={formValues.author}
          onChange={handleChange}
          className="block w-full border border-gray-300 rounded-lg shadow-sm p-3 text-gray-700 text-xl focus:ring-teal-500 focus:border-teal-500 transition duration-200"
          placeholder="Author's name"
          required
          disabled
        />
      </div>
      {/* Title Input */}
      <div className="mb-5">
        <label
          htmlFor="title"
          className="block text-lg font-semibold text-teal-600 mb-2"
        >
          Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formValues.title}
          onChange={handleChange}
          className="block w-full border border-gray-300 rounded-lg shadow-sm p-3 text-gray-700 text-xl focus:ring-teal-500 focus:border-teal-500 transition duration-200"
          placeholder="Enter the title"
          disabled={isUploading}
          required
        />
      </div>

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
          required
        >
          <option value="">Select a subject</option>
          {subjects.map((subject) => (
            <option key={subject.id} value={subject.id}>
              {subject.name}
            </option>
          ))}
        </select>
      </div>

      {/* Description Input */}
      <div className="mb-5">
        <label
          htmlFor="description"
          className="block text-lg font-semibold text-teal-600 mb-2"
        >
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={formValues.description}
          onChange={handleChange}
          className="block w-full border border-gray-300 rounded-lg shadow-sm p-3 text-gray-700 text-xl focus:ring-teal-500 focus:border-teal-500 transition duration-200"
          placeholder="Enter the description"
          disabled={isUploading}
          rows="4"
          required
        ></textarea>
      </div>

      {/* File Input */}
      <div className="mb-5">
        <label
          htmlFor="pdf"
          className="block text-lg font-semibold text-teal-600 mb-2"
        >
          Upload PDF
        </label>
        <input
          type="file"
          id="pdf"
          name="pdf"
          onChange={handleChange}
          className="block w-full border border-gray-300 rounded-lg shadow-sm p-3 text-gray-700 focus:ring-teal-500 focus:border-teal-500 transition duration-200"
          disabled={isUploading}
          required
        />
      </div>
    </Modal>
  );
}

export default UploadNoteModal;
