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
        <label htmlFor="description" className="block text-secondary mb-2">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={formValues.description}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded-md bg-input-background text-text border border-border focus:ring-2 focus:ring-accent focus:outline-none"
          placeholder="Enter the description"
          disabled={isUploading}
          rows="4"
        ></textarea>
      </div>
      <div className="mb-5">
        <label htmlFor="pdf" className="block text-secondary mb-2">
          Upload PDF
        </label>
        <input
          type="file"
          id="pdf"
          name="pdf"
          onChange={handleChange}
          className="w-full px-4 py-2 rounded-md bg-input-background text-text border border-border focus:ring-2 focus:ring-accent focus:outline-none"
          disabled={isUploading}
        />
      </div>
    </Modal>
  );
}

export default UploadNoteModal;
