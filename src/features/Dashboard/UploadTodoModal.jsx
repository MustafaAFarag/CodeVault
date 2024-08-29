/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import Modal from '../../ui/Modal';
import { useQuery } from '@tanstack/react-query';
import { fetchSubjects } from '../../services/apiNotes';
import SubjectDropdown from '../Sheets/SubjectDropdown';
import { toast } from 'react-hot-toast';
import { useSelectedSubject } from '../Notes/useSelectedSubject';

function UploadTodoModal({ isOpen, onClose, onSubmit }) {
  const [title, setTitle] = useState('');
  const [deadline, setDeadline] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    data: subjectsData,
    error: subjectsError,
    isLoading: subjectsLoading,
  } = useQuery({
    queryKey: ['subjects'],
    queryFn: fetchSubjects,
  });

  const { selectedSubject, handleSubjectChange } = useSelectedSubject();

  useEffect(() => {
    if (!isOpen) {
      setTitle('');
      setDeadline('');
      handleSubjectChange({ target: { value: null } }); // Ensure to handle null values
    }
  }, [isOpen, handleSubjectChange]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!selectedSubject) {
      toast.error('Please select a subject');
      return;
    }

    setIsSubmitting(true);

    const newTodo = {
      title,
      deadline: new Date(deadline).toISOString(),
      subject_id: selectedSubject,
    };

    try {
      await onSubmit(newTodo);
      onClose();
    } catch (error) {
      toast.error('Failed to add To-do');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      title="Create New To-Do"
      isSubmitting={isSubmitting}
      submitText="Create"
    >
      <div className="mb-4">
        <label
          htmlFor="title"
          className="block text-2xl font-semibold text-teal-600"
        >
          Title
        </label>
        <input
          type="text"
          id="title"
          className="mt-1 block w-full rounded-lg border border-gray-300 p-3 text-xl font-medium text-text shadow-sm transition duration-200 focus:border-teal-500 focus:ring-teal-500"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <SubjectDropdown
        subjects={subjectsData}
        onChange={handleSubjectChange}
        title="-- Select a Subject --"
        required
      />

      <div className="mb-4">
        <label
          htmlFor="deadline"
          className="block text-2xl font-semibold text-teal-600"
        >
          Deadline
        </label>
        <input
          type="date"
          id="deadline"
          className="mt-1 block w-full rounded-lg border border-gray-300 p-3 text-xl font-medium text-text shadow-sm transition duration-200 focus:border-teal-500 focus:ring-teal-500"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          required
        />
      </div>
    </Modal>
  );
}

export default UploadTodoModal;
