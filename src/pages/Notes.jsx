import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchNotesWithRatings, updateRating } from '../services/apiNotes';
import { FaStar, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { useState } from 'react';
import Spinner from '../ui/Spinner';
import Modal from '../ui/Modal';

function Notes() {
  const queryClient = useQueryClient();
  const [hoveredRatings, setHoveredRatings] = useState({});
  const [selectedRatings, setSelectedRatings] = useState({});
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch notes using React Query
  const {
    data: notes = [],
    error,
    isLoading,
  } = useQuery({
    queryKey: ['notes'],
    queryFn: fetchNotesWithRatings,
  });

  const mutation = useMutation({
    mutationFn: ({ noteId, rating }) => updateRating(noteId, rating),
    onSuccess: () => {
      queryClient.invalidateQueries(['notes']); // Refetch notes after updating rating
    },
    onError: (error) => {
      console.error('Error updating rating:', error);
    },
  });

  const handleRatingChange = (noteId, rating) => {
    mutation.mutate({ noteId, rating });
    setSelectedRatings((prev) => ({ ...prev, [noteId]: rating }));
  };

  const handleMouseEnter = (noteId, rating) => {
    setHoveredRatings((prev) => ({ ...prev, [noteId]: rating }));
  };

  const handleMouseLeave = (noteId) => {
    setHoveredRatings((prev) => ({ ...prev, [noteId]: null }));
  };

  const handleSubjectFilter = (subject) => {
    setSelectedSubject(subject);
    setIsDropdownOpen(false); // Close dropdown after selecting a subject
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  if (isLoading) return <Spinner />;
  if (error)
    return (
      <p className="text-center text-red-400">
        Error loading notes: {error.message}
      </p>
    );

  // Group notes by subject
  const notesBySubject = notes.reduce((acc, note) => {
    if (!acc[note.subject]) {
      acc[note.subject] = [];
    }
    acc[note.subject].push(note);
    return acc;
  }, {});

  // Find the best note in each subject
  const bestNotes = Object.keys(notesBySubject).reduce((acc, subject) => {
    const bestNote = notesBySubject[subject].reduce((best, current) =>
      (current.rating || 0) > (best.rating || 0) ? current : best,
    );
    acc[subject] = bestNote;
    return acc;
  }, {});

  // Filter notes by the selected subject
  const filteredNotes = selectedSubject
    ? notesBySubject[selectedSubject] || []
    : notes;

  // Get unique subjects
  const subjects = Object.keys(notesBySubject);

  const sortedNotes = filteredNotes.sort((a, b) => {
    const ratingA = a.rating || 0;
    const ratingB = b.rating || 0;
    return ratingB - ratingA;
  });

  return (
    <div className="p-6 bg-gray-900 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold text-white">Notes</h1>
        <div className="flex space-x-2">
          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="bg-gray-700 text-white px-4 py-2 rounded-md font-semibold text-sm flex items-center hover:bg-gray-600 transition-all duration-300"
            >
              {selectedSubject ? selectedSubject : 'Select Subject'}
              {isDropdownOpen ? (
                <FaChevronUp className="ml-2" />
              ) : (
                <FaChevronDown className="ml-2" />
              )}
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-gray-800 text-white rounded-md shadow-lg z-10">
                <button
                  onClick={() => handleSubjectFilter(null)}
                  className={`block w-full text-left px-4 py-2 rounded-md font-semibold text-sm ${
                    !selectedSubject
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-300'
                  } hover:bg-blue-700 transition-all duration-300`}
                >
                  All Subjects
                </button>
                {subjects.map((subject) => (
                  <button
                    key={subject}
                    onClick={() => handleSubjectFilter(subject)}
                    className={`block w-full text-left px-4 py-2 rounded-md font-semibold text-sm ${
                      selectedSubject === subject
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-300'
                    } hover:bg-blue-700 transition-all duration-300`}
                  >
                    {subject}
                  </button>
                ))}
              </div>
            )}
          </div>
          <button
            className="bg-red-600 text-white font-semibold text-sm rounded-md px-4 py-2 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-opacity-50 transition-colors duration-300"
            onClick={openModal}
          >
            Upload
          </button>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal} title="Upload Notes" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedNotes.map((note) => {
          // Display average rating from the database
          const averageRating = note.rating ? note.rating.toFixed(1) : '0.0';

          return (
            <div
              key={note.id}
              className={`bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700 flex flex-col justify-between h-full relative transition-shadow duration-300 hover:shadow-xl`}
            >
              {note.id === bestNotes[note.subject].id && (
                <div className="absolute top-0 right-0 bg-yellow-600 text-white  px-3 py-1 text-[0.7rem] font-semibold rounded-bl-lg">
                  Best Note in {note.subject}
                </div>
              )}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-semibold text-white">
                    {note.title}
                  </h2>
                  <div className="flex items-center text-yellow-500">
                    <FaStar className="w-5 h-5" />
                    <span className="ml-2 text-lg">{averageRating}</span>
                  </div>
                </div>

                <p className="text-gray-300 mb-4">{note.description}</p>
              </div>

              <div className="mt-auto">
                <p className=" mb-2 p-1  text-white">
                  {note.author ? `By : ${note.author}` : ''}
                </p>
                <a
                  href={note.file_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-center text-white bg-blue-600 hover:bg-blue-700 rounded-lg px-4 py-2 transition-colors duration-300"
                >
                  View Note
                </a>
              </div>

              <div className="flex items-center gap-2 mt-4 justify-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => handleRatingChange(note.id, star)}
                    onMouseEnter={() => handleMouseEnter(note.id, star)}
                    onMouseLeave={() => handleMouseLeave(note.id)}
                    className={`p-1 ${
                      star <=
                      (selectedRatings[note.id] ||
                        hoveredRatings[note.id] ||
                        note.rating ||
                        0)
                        ? 'text-yellow-500'
                        : 'text-gray-500'
                    } hover:text-yellow-300 transition-colors duration-200`}
                  >
                    <FaStar className="w-5 h-5" />
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Notes;
