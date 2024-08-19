import { useQuery } from '@tanstack/react-query';
import { fetchNotes } from '../services/apiNotes';
import { useUser } from '../features/authentication/useUser';
import Spinner from '../ui/Spinner';
import SubjectDropdown from '../features/Sheets/SubjectDropdown';
import NoteList from '../features/Notes/NoteList';
import UploadNoteModal from '../features/Notes/UploadNoteModal';
import { useUploadNote } from '../features/Notes/useUploadNote';
import { useRateNote } from '../features/Notes/useRateNote';
import { useNoteForm } from '../features/Notes/useNoteForm';
import { useSelectedSubject } from '../features/Notes/useSelectedSubject';
import ErrorMessage from '../ui/ErrorMessage';
import { useFilteredNotes } from '../features/Notes/useFilteredNotes';

function Notes() {
  const { user } = useUser();
  const { selectedSubject, handleSubjectChange } = useSelectedSubject();
  const {
    formValues,
    handleChange,
    handleSubmit,
    isModalOpen,
    handleUploadClick,
    handleCloseModal,
  } = useNoteForm();

  const { data, error, isLoading } = useQuery({
    queryKey: ['notes'],
    queryFn: fetchNotes,
  });

  const uploadMutation = useUploadNote();
  const rateNoteMutation = useRateNote();

  const handleRatingChange = (noteId, ratingValue) => {
    rateNoteMutation.mutate(
      { noteId, ratingValue, userId: user.id },
      {
        onError: (error) => {
          alert(error.message); // Notify the user that they've already rated this note
        },
      },
    );
  };

  const { subjects, filteredNotes } = useFilteredNotes(data, selectedSubject);

  if (isLoading) return <Spinner />;

  return (
    <div className="p-6 bg-gray-900 min-h-screen">
      <h1 className="text-4xl font-bold text-white mb-6 text-center">Notes</h1>

      <div className="flex justify-between items-center mb-6">
        <SubjectDropdown subjects={subjects} onChange={handleSubjectChange} />
        <button
          onClick={handleUploadClick}
          className="bg-blue-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-700 transition-all"
        >
          Upload
        </button>
      </div>

      {error ? (
        <ErrorMessage message={error.message} />
      ) : selectedSubject && filteredNotes.length > 0 ? (
        <NoteList
          notes={filteredNotes}
          onRatingChange={handleRatingChange}
          user={user}
        />
      ) : (
        <p className="text-center text-gray-400">
          {selectedSubject
            ? 'No notes available for this subject.'
            : 'Please select a subject to view notes.'}
        </p>
      )}

      <UploadNoteModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={(e) => handleSubmit(e, uploadMutation)}
        formValues={formValues}
        subjects={subjects}
        handleChange={handleChange}
      />
    </div>
  );
}

export default Notes;
