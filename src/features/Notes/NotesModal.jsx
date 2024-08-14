/* eslint-disable react/prop-types */
import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import supabase from '../../services/supabase';
import { toast } from 'react-toastify';

const NotesModal = ({ isOpen, onClose, title }) => {
  const { register, handleSubmit, reset } = useForm();
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [subjects, setSubjects] = useState([]); // State to store subjects

  useEffect(() => {
    if (isOpen) {
      fetchSubjects(); // Fetch subjects when the modal opens
    }
  }, [isOpen]);

  const fetchSubjects = async () => {
    const { data: subjectsData, error } = await supabase
      .from('subjects')
      .select('name');

    if (error) {
      console.error('Error fetching subjects:', error.message);
      toast.error('Error fetching subjects.');
    } else {
      setSubjects(subjectsData);
    }
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const onSubmit = async (data) => {
    if (!file) return;

    setUploading(true);

    const { data: fileData, error: uploadError } = await supabase.storage
      .from('notes')
      .upload(`public/${file.name}`, file);

    if (uploadError) {
      console.error('Error uploading file:', uploadError.message);
      toast.error('Error uploading file.');
      setUploading(false);
      return;
    }

    const fileUrl = fileData.path; // Adjust based on your storage response

    const { error: dbError } = await supabase.from('notes').insert([
      {
        title: data.title,
        description: data.description,
        file_url: fileUrl,
        rating: 0,
        subject: data.subject,
        author: data.author,
      },
    ]);

    if (dbError) {
      console.error('Error inserting note:', dbError.message);
      toast.error('Error inserting note.');
    } else {
      toast.success('Note uploaded successfully!');
      reset();
      setFile(null);
      onClose();
    }

    setUploading(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-70">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-semibold mb-4 text-white">{title}</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300">
              Title
            </label>
            <input
              type="text"
              {...register('title', { required: true })}
              className="mt-1 block w-full border border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-gray-700 text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300">
              Description
            </label>
            <textarea
              {...register('description', { required: true })}
              className="mt-1 block w-full border border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-gray-700 text-white"
              rows="4"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300">
              Subject
            </label>
            <select
              {...register('subject', { required: true })}
              className="mt-1 block w-full border border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-gray-700 text-white"
            >
              <option value="">Select a subject</option>
              {subjects.map((subject) => (
                <option key={subject.name} value={subject.name}>
                  {subject.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300">
              Author
            </label>
            <input
              type="text"
              {...register('author', { required: true })}
              className="mt-1 block w-full border border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-gray-700 text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300">
              File
            </label>
            <input
              type="file"
              onChange={handleFileChange}
              className="mt-1 block w-full text-sm text-gray-300 border border-gray-600 rounded-md bg-gray-700"
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={uploading}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
              {uploading ? 'Uploading...' : 'Upload'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NotesModal;
