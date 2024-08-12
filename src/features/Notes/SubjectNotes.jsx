import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchNotesWithRatings } from '../../services/apiNotes';
import Notes from '../../pages/Notes';

function SubjectNotes() {
  const { subjectname } = useParams();

  const {
    data: notes = [],
    error,
    isLoading,
  } = useQuery({
    queryKey: ['notes', subjectname],
    queryFn: () => fetchNotesWithRatings(subjectname),
  });

  if (isLoading) return <p className="text-center text-gray-600">Loading...</p>;
  if (error)
    return (
      <p className="text-center text-red-500">
        Error loading notes: {error.message}
      </p>
    );

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold text-gray-800">
          Notes for {subjectname}
        </h1>
      </div>
      <div className="grid grid-cols-2 gap-6">
        {notes.map((note) => (
          <Notes key={note.id} note={note} />
        ))}
      </div>
    </div>
  );
}

export default SubjectNotes;
