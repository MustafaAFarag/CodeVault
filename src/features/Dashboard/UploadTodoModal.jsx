/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from 'react';
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

  async function handleSubmit(e) {
    e.preventDefault();
    setIsSubmitting(true);

    const newTodo = {
      title,
      deadline: new Date(deadline).toISOString(),
      subject_id: selectedSubject, // Include subject_id
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
          className="block text-sm font-semibold text-teal-600"
        >
          Title
        </label>
        <input
          type="text"
          id="title"
          className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-3 text-text text-xl font-medium focus:ring-teal-500 focus:border-teal-500 transition duration-200"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <SubjectDropdown
        subjects={subjectsData}
        selectedSubject={selectedSubject} // Pass selectedSubject
        onChange={handleSubjectChange}
        title="-- Select a Subject --"
        className="flex-1"
      />

      <div className="mb-4">
        <label
          htmlFor="deadline"
          className="block text-sm font-semibold text-teal-600"
        >
          Deadline
        </label>
        <input
          type="date"
          id="deadline"
          className="mt-1 block w-full border border-gray-300 rounded-lg text-xl shadow-sm p-3 text-text font-medium focus:ring-teal-500 focus:border-teal-500 transition duration-200"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          required
        />
      </div>
    </Modal>
  );
}

export default UploadTodoModal;
