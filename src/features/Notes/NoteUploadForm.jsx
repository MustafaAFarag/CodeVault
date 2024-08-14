/* eslint-disable react/prop-types */
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createEditNote, uploadFileToSupabase } from '../../services/apiNotes';
import { toast } from 'react-toastify';
import { useState } from 'react';

function NoteUploadForm({ closeModal }) {
  const [isUploading, setIsUploading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createEditNote,
    onSuccess: () => {
      toast.success('Note uploaded successfully!');
      queryClient.invalidateQueries(['notes']);
      closeModal();
      reset();
    },
    onError: (error) => {
      toast.error(`Error uploading note: ${error.message}`);
    },
  });

  const onSubmit = async (data) => {
    try {
      setIsUploading(true);

      // Step 1: Upload the file to Supabase storage
      const file = data.file[0]; // Get the first file from the input
      const file_url = await uploadFileToSupabase(file);

      // Step 2: Prepare the note data with the uploaded file URL
      const noteData = {
        title: data.title,
        description: data.description,
        subject: data.subject,
        author: data.author,
        file_url: file_url, // Include the file URL
        rating: 0, // Set initial rating to 0
      };

      // Step 3: Insert the note into the database
      mutation.mutate(noteData);
    } catch (error) {
      toast.error('File upload failed');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 p-4 bg-gray-800 rounded-lg shadow-lg"
    >
      {/* Title Field */}
      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-100"
        >
          Title
        </label>
        <input
          id="title"
          type="text"
          {...register('title', { required: 'Title is required' })}
          className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.title && (
          <p className="text-red-400 text-sm mt-1">{errors.title.message}</p>
        )}
      </div>

      {/* Description Field */}
      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-100"
        >
          Description
        </label>
        <textarea
          id="description"
          {...register('description', { required: 'Description is required' })}
          className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows="4"
        />
        {errors.description && (
          <p className="text-red-400 text-sm mt-1">
            {errors.description.message}
          </p>
        )}
      </div>

      {/* Subject Field */}
      <div>
        <label
          htmlFor="subject"
          className="block text-sm font-medium text-gray-100"
        >
          Subject
        </label>
        <input
          id="subject"
          type="text"
          {...register('subject', { required: 'Subject is required' })}
          className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.subject && (
          <p className="text-red-400 text-sm mt-1">{errors.subject.message}</p>
        )}
      </div>

      {/* Author Field */}
      <div>
        <label
          htmlFor="author"
          className="block text-sm font-medium text-gray-100"
        >
          Author
        </label>
        <input
          id="author"
          type="text"
          {...register('author', { required: 'Author is required' })}
          className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.author && (
          <p className="text-red-400 text-sm mt-1">{errors.author.message}</p>
        )}
      </div>

      {/* File Upload Field */}
      <div>
        <label
          htmlFor="file"
          className="block text-sm font-medium text-gray-100"
        >
          Upload File (PDF)
        </label>
        <input
          id="file"
          type="file"
          {...register('file', { required: 'File is required' })}
          accept=".pdf"
          className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.file && (
          <p className="text-red-400 text-sm mt-1">{errors.file.message}</p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className={`w-full py-2 px-4 rounded-md transition ${
          isUploading ? 'bg-gray-600' : 'bg-blue-600 hover:bg-blue-700'
        } text-white`}
        disabled={isUploading}
      >
        {isUploading ? 'Uploading...' : 'Upload Note'}
      </button>
    </form>
  );
}

export default NoteUploadForm;
