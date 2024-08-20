import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchNotes, fetchSubjects } from '../services/apiNotes';
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
import { toast } from 'react-hot-toast';

function Notes() {
  const [isUploading, setIsUploading] = useState(false);

  const {
    data: subjectsData,
    error: subjectsError,
    isLoading: subjectsLoading,
  } = useQuery({
    queryKey: ['subjects'],
    queryFn: fetchSubjects,
  });

  const { user } = useUser();
  const { selectedSubject, handleSubjectChange } = useSelectedSubject();
  const {
    formValues,
    handleChange,
    isModalOpen,
    handleUploadClick,
    handleCloseModal,
    clearFormValues,
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
          toast.error(`Error: ${error.message}`);
        },
      },
    );
  };

  const { filteredNotes } = useFilteredNotes(data, selectedSubject);

  // Sort notes by average_rating in descending order
  const sortedNotes = filteredNotes.sort(
    (a, b) => b.average_rating - a.average_rating,
  );

  // Identify the highest-rated note
  const bestNote = sortedNotes.length > 0 ? sortedNotes[0] : null;

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsUploading(true);

    try {
      await uploadMutation.mutateAsync(formValues);
      toast.success('Note uploaded successfully!');
      clearFormValues();
      handleCloseModal();
    } catch (error) {
      toast.error(`Error: ${error.message}`);
    } finally {
      setIsUploading(false);
    }
  };

  if (isLoading || subjectsLoading) return <Spinner />;
  if (subjectsError) return <ErrorMessage message={subjectsError.message} />;

  return (
    <div className="p-6 bg-gray-900 min-h-screen">
      <h1 className="text-4xl font-bold text-white mb-6 text-center">Notes</h1>

      <div className="flex justify-between items-center mb-6">
        <SubjectDropdown
          subjects={subjectsData}
          onChange={handleSubjectChange}
        />
        <button
          onClick={handleUploadClick}
          className="bg-blue-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-700 transition-all"
        >
          Upload
        </button>
      </div>

      {error ? (
        <ErrorMessage message={error.message} />
      ) : selectedSubject && sortedNotes.length > 0 ? (
        <NoteList
          notes={sortedNotes}
          onRatingChange={handleRatingChange}
          user={user}
          bestNoteId={bestNote?.note_id} // Pass the ID of the best note
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
        onClose={() => {
          handleCloseModal();
          clearFormValues(); // Clear form values when closing modal
        }}
        onSubmit={handleSubmit}
        formValues={formValues}
        subjects={subjectsData}
        handleChange={handleChange}
        isUploading={isUploading}
      />
    </div>
  );
}

export default Notes;
