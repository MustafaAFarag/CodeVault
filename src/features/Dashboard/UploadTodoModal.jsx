/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import Modal from '../../ui/Modal';
import { useQuery } from '@tanstack/react-query';
import { fetchSubjects } from '../../services/apiNotes';
import SubjectDropdown from '../Sheets/SubjectDropdown';
import { toast } from 'react-hot-toast';
import { useSelectedSubject } from '../Notes/useSelectedSubject';
import { uploadFileToSupabase } from '../../services/apiTodos';

function UploadTodoModal({ isOpen, onClose, onSubmit }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');
  const [file, setFile] = useState(null);
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
      setDescription('');
      setFile(null);
      handleSubjectChange({ target: { value: null } });
    }
  }, [isOpen, handleSubjectChange]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!selectedSubject) {
      toast.error('Please select a subject');
      return;
    }

    setIsSubmitting(true);

    try {
      let fileUrl = '';
      if (file) {
        // Upload the file to Supabase and get the URL
        fileUrl = await uploadFileToSupabase(file);
      }

      const newTodo = {
        title,
        deadline: new Date(deadline).toISOString(),
        description,
        subject_id: selectedSubject,
        url: fileUrl, // Add the file URL here
      };

      await onSubmit(newTodo);
      onClose();
    } catch (error) {
      toast.error('Failed to add To-do');
    } finally {
      setIsSubmitting(false);
    }
  }

  if (subjectsError) return;
  if (subjectsLoading) return;
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
          className="block text-xl font-semibold text-teal-600"
        >
          Title
        </label>
        <input
          type="text"
          id="title"
          className="mt-1 block w-full rounded-lg border border-gray-300 p-3 text-xl font-medium text-text shadow-sm transition duration-200 focus:border-teal-500 focus:ring-teal-500"
          placeholder="Enter the title (Max 80 Characters)"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          maxLength={80}
          required
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="description"
          className="block text-xl font-semibold text-teal-600"
        >
          Description
        </label>
        <textarea
          id="description"
          className="mt-1 block w-full rounded-lg border border-gray-300 p-3 text-xl font-medium text-text shadow-sm transition duration-200 focus:border-teal-500 focus:ring-teal-500"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter the Description (Max 180 Characters)"
          required
          maxLength={180}
        ></textarea>
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
          className="block text-xl font-semibold text-teal-600"
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

      <div className="mb-4">
        <label
          htmlFor="file"
          className="mb-2 block text-xl font-semibold text-teal-600"
        >
          Upload PDF
        </label>
        <input
          type="file"
          id="file"
          className="block w-full rounded-lg border border-gray-300 p-3 text-xl text-gray-700 shadow-sm transition duration-200 focus:border-teal-500 focus:ring-teal-500"
          accept=".pdf"
          onChange={(e) => setFile(e.target.files[0])}
        />
      </div>
    </Modal>
  );
}

export default UploadTodoModal;
