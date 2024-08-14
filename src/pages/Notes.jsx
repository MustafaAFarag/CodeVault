import { useQuery } from '@tanstack/react-query';

import { fetchNotes } from '../services/apiNotes';
import Spinner from '../ui/Spinner';
import { toast } from 'react-toastify';
import { FaExternalLinkAlt, FaStar } from 'react-icons/fa';

function Notes() {
  const {
    data: notes,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['notes'],
    queryFn: fetchNotes,
  });

  if (isLoading) return <Spinner />;
  if (error) {
    toast.error(`Error ${error.message}`);
    return <div>Error loading notes</div>;
  }

  if (!notes || notes.length === 0) {
    return <div>No notes available</div>;
  }

  return (
    <div className="container mx-auto p-4 ">
      <h1 className="text-2xl font-bold mb-4 text-gray-100">Notes</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {notes.map((note) => (
          <div
            key={note.id}
            className="p-4 bg-gray-700 border border-gray-600 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:shadow-blue-500/50 transform hover:-translate-y-1"
          >
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-xl font-semibold text-gray-100 ">
                {note.title}
              </h2>
              <p
                className=" text-yellow-400 flex  items-center"
                title={`Average Rating : ${note.average_rating}`}
              >
                {note.average_rating ? (
                  <>
                    <FaStar className="w-4 h-4 -translate-y-[0.1rem] mr-2" />
                    <span>{note.average_rating}</span>
                  </>
                ) : (
                  'no ratings yet'
                )}
              </p>
            </div>
            <p className="text-gray-300 mb-4">Subject ID : {note.subject_id}</p>
            <a
              href={note.pdf_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:underline flex items-center"
            >
              <span className="mr-2">View PDF</span>
              <FaExternalLinkAlt />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Notes;
