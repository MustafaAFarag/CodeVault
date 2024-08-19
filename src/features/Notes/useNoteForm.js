import { useState } from 'react';
import toast from 'react-hot-toast';

export function useNoteForm() {
  const [formValues, setFormValues] = useState({
    title: '',
    description: '',
    subject_id: '',
    pdf: null,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleUploadClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const clearFormValues = () => {
    setFormValues({
      title: '',
      description: '',
      subject_id: '',
      pdf: null,
    });
  };

  const handleSubmit = async (e, uploadMutation) => {
    e.preventDefault();
    try {
      await uploadMutation.mutateAsync(formValues);
      // Clear form values and close the modal on success
      clearFormValues();
      setIsModalOpen(false);
    } catch (error) {
      // Optionally handle error here
      toast.error(`Error: ${error.message}`);
    } finally {
      // Set isUploading to false and perform any additional actions if necessary
    }
  };

  return {
    formValues,
    handleChange,
    handleSubmit,
    isModalOpen,
    handleUploadClick,
    handleCloseModal,
    clearFormValues, // Expose the clearFormValues function
  };
}
