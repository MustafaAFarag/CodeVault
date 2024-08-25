/* eslint-disable react/prop-types */
import { useState } from 'react';
import Modal from '../../ui/Modal';
import { toast } from 'react-hot-toast';

function UploadTodoModal({ isOpen, onClose, onSubmit }) {
  const [title, setTitle] = useState('');
  const [deadline, setDeadline] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setIsSubmitting(true);

    const newTodo = {
      title,
      deadline: new Date(deadline).toISOString(),
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
          className="block text-sm font-medium text-gray-700"
        >
          Title
        </label>
        <input
          type="text"
          id="title"
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="deadline"
          className="block text-sm font-medium text-gray-700"
        >
          Deadline
        </label>
        <input
          type="date"
          id="deadline"
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          required
        />
      </div>
    </Modal>
  );
}

export default UploadTodoModal;
