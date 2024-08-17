// src/components/Notes.jsx

import { useQuery } from '@tanstack/react-query';
import { fetchNotes } from '../services/apiNotes';
import Spinner from '../ui/Spinner';

function Notes() {
  const { data, error, isLoading } = useQuery({
    queryKey: ['notes'],
    queryFn: fetchNotes,
  });

  if (isLoading) return <Spinner />;

  if (error)
    return <p className="text-center text-red-400">Error: {error.message}</p>;

  return (
    <div className="p-6 bg-gray-900 min-h-screen">
      <h1 className="text-4xl font-bold text-white mb-6 text-center">Notes</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((note) => (
          <div
            key={note.id}
            className="bg-gray-800 p-4 rounded-lg shadow-lg border border-gray-700 transition-all duration-300 hover:shadow-xl"
          >
            <h2 className="text-xl font-semibold text-white mb-2">
              {note.title}
            </h2>
            <div className="border-t border-gray-700 pt-2">
              {note.noteRating && note.noteRating.length > 0 ? (
                note.noteRating.map((rating) => (
                  <p key={rating.id} className="text-sm text-gray-400">
                    Rating: {rating.rating}
                  </p>
                ))
              ) : (
                <p className="text-sm text-gray-500">No ratings available</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Notes;
