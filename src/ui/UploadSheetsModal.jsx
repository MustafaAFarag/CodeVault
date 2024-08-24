/* eslint-disable react/prop-types */
function UploadSheetsModal({
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
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
      <div className="bg-background p-8 rounded-lg shadow-lg max-w-lg w-full">
        <h2 className="text-3xl font-bold text-secondary mb-6 text-center">
          Upload a Section Sheet
        </h2>
        <form onSubmit={onSubmit}>
          <div className="mb-5">
            <label htmlFor="title" className="block text-secondary mb-2">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formValues.title}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md bg-input-background text-text border border-border focus:ring-2 focus:ring-accent focus:outline-none"
              placeholder="Enter the title"
              disabled={isUploading}
            />
          </div>
          <div className="mb-5">
            <label htmlFor="subject_id" className="block text-secondary mb-2">
              Subject
            </label>
            <select
              id="subject_id"
              name="subject_id"
              value={formValues.subject_id}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md bg-input-background text-text border border-border focus:ring-2 focus:ring-accent focus:outline-none"
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
          <div className="mb-5">
            <label htmlFor="pdf" className="block text-secondary mb-2">
              Upload Sections PDF
            </label>
            <input
              type="file"
              id="pdf"
              name="url"
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md bg-input-background text-text border border-border focus:ring-2 focus:ring-accent focus:outline-none"
              disabled={isUploading}
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className={`bg-error px-5 py-2 rounded-md shadow-md transition-all mr-3 ${
                isUploading
                  ? 'bg-opacity-50 cursor-not-allowed'
                  : 'hover:bg-opacity-80'
              }`}
              disabled={isUploading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`bg-accent text-white px-5 py-2 rounded-md shadow-md transition-all ${
                isUploading
                  ? 'bg-opacity-50 cursor-not-allowed'
                  : 'hover:bg-opacity-80'
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

export default UploadSheetsModal;
