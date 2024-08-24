import { useState } from 'react';
import toast from 'react-hot-toast';

export function useSheetsForm() {
  const [formValues, setFormValues] = useState({
    title: '',
    subject_id: '',
    url: null,
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
      subject_id: '',
      url: null,
    });
  };

  const handleSubmit = async (e, uploadMutation) => {
    e.preventDefault();
    if (!formValues.url) {
      toast.error('Please upload a PDF file.');
      return;
    }
    try {
      // Pass the file object to the upload function
      await uploadMutation.mutateAsync({
        title: formValues.title,
        subject_id: formValues.subject_id,
        file: formValues.url,
      });
      // Clear form values and close the modal on success
      clearFormValues();
      setIsModalOpen(false);
    } catch (error) {
      toast.error(`Error: ${error.message}`);
    }
  };

  return {
    formValues,
    handleChange,
    handleSubmit,
    isModalOpen,
    handleUploadClick,
    handleCloseModal,
    clearFormValues,
  };
}
