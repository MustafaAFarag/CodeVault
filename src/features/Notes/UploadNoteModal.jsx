/* eslint-disable react/prop-types */

function UploadNoteModal({
  isOpen,
  onClose,
  onSubmit,
  formValues,
  subjects,
  handleChange,
  isUploading,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-lg w-full">
        <h2 className="text-2xl font-bold text-white mb-4">
          Upload a New Note
        </h2>
        <form onSubmit={onSubmit}>
          <div className="mb-4">
            <label className="block text-white mb-2">Title</label>
            <input
              type="text"
              name="title"
              value={formValues.title}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md bg-gray-700 text-white border border-gray-600"
              placeholder="Enter the title"
              disabled={isUploading}
            />
          </div>
          <div className="mb-4">
            <label className="block text-white mb-2">Description</label>
            <textarea
              name="description"
              value={formValues.description}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md bg-gray-700 text-white border border-gray-600"
              placeholder="Enter the description"
              disabled={isUploading}
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="block text-white mb-2">Subject</label>
            <select
              name="subject_id"
              value={formValues.subject_id}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md bg-gray-700 text-white border border-gray-600"
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
          <div className="mb-4">
            <label className="block text-white mb-2">Upload PDF</label>
            <input
              type="file"
              name="pdf"
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md bg-gray-700 text-white border border-gray-600"
              disabled={isUploading}
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className={`bg-red-600 text-white px-4 py-2 rounded-md shadow-md transition-all mr-2 ${isUploading ? 'bg-blue-400 cursor-not-allowed' : 'hover:bg-red-700'}`}
              disabled={isUploading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`bg-blue-600 text-white px-4 py-2 rounded-md shadow-md transition-all ${
                isUploading
                  ? 'bg-blue-400 cursor-not-allowed'
                  : 'hover:bg-blue-700'
              }`}
              disabled={isUploading}
            >
              {isUploading ? 'Uploading...' : 'Upload'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UploadNoteModal;
