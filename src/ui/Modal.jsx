/* eslint-disable react/prop-types */
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import supabase from '../services/supabase';
import { toast } from 'react-toastify';

const Modal = ({ isOpen, onClose, title }) => {
  const { register, handleSubmit, reset } = useForm();
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const onSubmit = async (data) => {
    if (!file) return;

    setUploading(true);

    // Upload file to Supabase storage
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

    // Insert note into Supabase database
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
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-semibold mb-4">{title}</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              {...register('title', { required: true })}
              className="mt-1 block w-full border text-red-800 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              {...register('description', { required: true })}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              rows="4"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Subject
            </label>
            <input
              type="text"
              {...register('subject', { required: true })}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Author
            </label>
            <input
              type="text"
              {...register('author', { required: true })}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              File
            </label>
            <input
              type="file"
              onChange={handleFileChange}
              className="mt-1 block w-full text-sm text-gray-900 border border-gray-300 rounded-md"
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

export default Modal;
