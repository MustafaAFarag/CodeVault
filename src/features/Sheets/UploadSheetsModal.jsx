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
      onSubmit={(e) => onSubmit(e)}
      title={`Upload a ${title} Sheet`}
      isSubmitting={isUploading}
      submitText="Upload"
    >
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
          Upload {title} PDF
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
    </Modal>
  );
}

export default UploadSheetsModal;
