import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchNotes } from '../services/apiNotes';
import Spinner from '../ui/Spinner';
import SubjectDropdown from '../features/Sheets/SubjectDropdown';
import { FaStar } from 'react-icons/fa';
import { Rating } from 'primereact/rating';

function Notes() {
  const [selectedSubject, setSelectedSubject] = useState('');
  const [value, setValue] = useState(null);

  const { data, error, isLoading } = useQuery({
    queryKey: ['notes'],
    queryFn: fetchNotes,
  });

  const handleSubjectChange = (e) => {
    setSelectedSubject(e.target.value);
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
        <button className="bg-blue-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-700 transition-all">
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
                  <FaStar className="text-yellow-400 mr-1" />
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
    </div>
  );
}

export default Notes;
