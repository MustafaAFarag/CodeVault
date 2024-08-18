import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchNotes, uploadNote } from '../services/apiNotes'; // Update the import
import Spinner from '../ui/Spinner';
import SubjectDropdown from '../features/Sheets/SubjectDropdown';
import { FaStar } from 'react-icons/fa';
import { Rating } from 'primereact/rating';

function Notes() {
  const [selectedSubject, setSelectedSubject] = useState('');
  const [value, setValue] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formValues, setFormValues] = useState({
    title: '',
    description: '',
    subject_id: '',
    pdf: null,
  });

  const queryClient = useQueryClient();

  const { data, error, isLoading } = useQuery({
    queryKey: ['notes'],
    queryFn: fetchNotes,
  });

  const mutation = useMutation({
    mutationFn: uploadNote,
    onSuccess: () => {
      queryClient.invalidateQueries(['notes']);
      setIsModalOpen(false);
    },
  });

  const handleSubjectChange = (e) => {
    setSelectedSubject(e.target.value);
  };

  const handleUploadClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate(formValues);
  };

  if (isLoading) return <Spinner />;

  if (error)
    return <p className="text-center text-red-400">Error: {error.message}</p>;

  // Group notes by subject_id and extract unique subjects
  const notesBySubject = data.reduce((acc, note) => {
    if (!acc[note.subject_id]) {
      acc[note.subject_id] = {
        subject: note.subjects,
        notes: [],
      };
    }
    acc[note.subject_id].notes.push(note);
    return acc;
  }, {});

  const subjects = Object.values(notesBySubject).map((group) => group.subject);

  // Filter notes based on the selected subject
  const filteredNotes = selectedSubject
    ? notesBySubject[selectedSubject]?.notes || []
    : [];

  return (
    <div className="p-6 bg-gray-900 min-h-screen">
      <h1 className="text-4xl font-bold text-white mb-6 text-center">Notes</h1>

      {/* Subject Dropdown for Filtering */}
      <div className="flex justify-between items-center mb-6">
        <SubjectDropdown subjects={subjects} onChange={handleSubjectChange} />
        <button
          onClick={handleUploadClick}
          className="bg-blue-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-700 transition-all"
        >
          Upload
        </button>
      </div>

      {/* Conditionally render the notes section */}
      {selectedSubject ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNotes.map((note) => (
            <div
              key={note.id}
              className="bg-gray-800 p-4 rounded-lg shadow-lg border border-gray-700 transition-all duration-300 hover:shadow-xl hover:bg-gray-700"
            >
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-white mb-2">
                  {note.title}
                </h2>
                <div className="flex items-center mb-2">
                  {note.average_rating !== null && (
                    <FaStar className="text-yellow-400 mr-1" />
                  )}
                  <p className="text-sm text-gray-400">
                    {note.average_rating !== null
                      ? note.average_rating
                      : 'No ratings yet'}
                  </p>
                </div>
              </div>
              <p className="text-gray-300 mb-2">{note.description}</p>
              <a
                href={note.pdf_url}
                target="_blank"
                className="text-blue-400 underline mb-2 block"
              >
                View PDF
              </a>
              <Rating
                value={value}
                onChange={(e) => setValue(e.value)}
                cancel={false}
                className="my-2"
              />
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-400 mt-6">
          Please select a subject to view notes.
        </p>
      )}

      {/* Upload Note Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-lg w-full">
            <h2 className="text-2xl font-bold text-white mb-4">
              Upload a New Note
            </h2>
            {/* Form Fields */}
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-white mb-2">Title</label>
                <input
                  type="text"
                  name="title"
                  value={formValues.title}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-md bg-gray-700 text-white border border-gray-600"
                  placeholder="Enter the title"
                />
              </div>
              <div className="mb-4">
                <label className="block text-white mb-2">Description</label>
                <textarea
                  name="description"
                  value={formValues.description}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-md bg-gray-700 text-white border border-gray-600"
                  placeholder="Enter the description"
                ></textarea>
              </div>
              <div className="mb-4">
                <label className="block text-white mb-2">Subject</label>
                <select
                  name="subject_id"
                  value={formValues.subject_id}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-md bg-gray-700 text-white border border-gray-600"
                >
                  <option value="">Select a subject</option>
                  {subjects.map((subject) => (
                    <option key={subject.id} value={subject.id}>
                      {subject.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-white mb-2">Upload PDF</label>
                <input
                  type="file"
                  name="pdf"
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-md bg-gray-700 text-white border border-gray-600"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="bg-red-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-red-700 transition-all mr-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-700 transition-all"
                >
                  Upload
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Notes;
