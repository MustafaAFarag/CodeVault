import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchNotesWithRatings, updateRating } from '../services/apiNotes';
import { FaStar } from 'react-icons/fa';
import { useState } from 'react';

function Notes() {
  const queryClient = useQueryClient();
  const [hoveredRatings, setHoveredRatings] = useState({});
  const [selectedRatings, setSelectedRatings] = useState({});

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

  if (isLoading) return <p className="text-center text-gray-600">Loading...</p>;
  if (error)
    return (
      <p className="text-center text-red-500">
        Error loading notes: {error.message}
      </p>
    );

  // Sort notes in descending order based on their rating
  const sortedNotes = notes
    .slice() // Create a shallow copy of the notes array to avoid mutating the original
    .sort((a, b) => (b.rating || 0) - (a.rating || 0)); // Sort by rating in descending order

  // Get the highest-rated note
  const highestRatedNote = sortedNotes[0] || {};

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold text-gray-800">Notes</h1>
        <button className="bg-red-500 text-white font-semibold rounded-md px-4 py-2 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition-colors duration-300">
          Upload
        </button>
      </div>
      <div className="grid grid-cols-2 gap-6">
        {sortedNotes.map((note) => {
          // Display average rating from the database
          const averageRating = note.rating ? note.rating.toFixed(1) : '0.0';

          return (
            <div
              key={note.id}
              className={`bg-white p-6 rounded-lg shadow-lg border border-gray-300 flex flex-col justify-between h-full relative ${
                note.id === highestRatedNote.id ? 'bg-yellow-50' : ''
              }`}
            >
              {note.id === highestRatedNote.id && (
                <div className="absolute top-0 right-0 bg-yellow-500 text-white px-3 py-1 text-sm font-semibold rounded-bl-lg">
                  Best Note
                </div>
              )}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-semibold text-gray-800">
                    {note.title}
                  </h2>
                  <div className="flex items-center text-yellow-500">
                    <FaStar className="w-5 h-5" />
                    <span className="ml-2 text-lg">{averageRating}</span>
                  </div>
                </div>
                <p className="text-gray-700 mb-4">{note.description}</p>
              </div>

              <a
                href={note.file_url}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-center text-white bg-blue-500 hover:bg-blue-600 rounded-lg px-4 py-2 mt-auto transition-colors duration-300"
              >
                View Note
              </a>

              <div className="flex items-center gap-2 mt-4">
                <span className="text-gray-800">Rate this note:</span>
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
                        : 'text-gray-400'
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
