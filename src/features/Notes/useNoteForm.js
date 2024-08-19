import { useState } from 'react';

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

  const handleSubmit = (e, uploadMutation) => {
    e.preventDefault();
    uploadMutation.mutate(formValues, {
      onSuccess: () => setIsModalOpen(false),
    });
  };

  return {
    formValues,
    handleChange,
    handleSubmit,
    isModalOpen,
    handleUploadClick,
    handleCloseModal,
  };
}
