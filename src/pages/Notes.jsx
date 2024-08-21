import { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchNotes, fetchSubjects } from '../services/apiNotes';
import { useUser } from '../features/authentication/useUser';
import NotesLoader from '../ui/NotesLoader';
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
  const [pagination, setPagination] = useState({
    first: 0,
    rows: 6, // Show 6 notes per page
  });
  const [searchQuery, setSearchQuery] = useState('');

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

  // Filter notes based on search query
  const searchedNotes = useMemo(() => {
    return filteredNotes.filter(
      (note) =>
        note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        note.description.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [filteredNotes, searchQuery]);

  // Sort notes by average_rating in descending order
  const sortedNotes = useMemo(() => {
    return searchedNotes.sort((a, b) => b.average_rating - a.average_rating);
  }, [searchedNotes]);

  // Calculate the best note globally
  const bestNote = useMemo(() => {
    return sortedNotes.length > 0 ? sortedNotes[0] : null;
  }, [sortedNotes]);

  // Paginate notes
  const totalRecords = sortedNotes.length;
  const notesToDisplay = sortedNotes.slice(
    pagination.first,
    pagination.first + pagination.rows,
  );

  const handlePageChange = (event) => {
    setPagination({
      first: event.first,
      rows: event.rows,
    });
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

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

  if (isLoading || subjectsLoading) return <NotesLoader />;
  if (subjectsError) return <ErrorMessage message={subjectsError.message} />;

  return (
    <div className="p-6 bg-background min-h-screen">
      <h1 className="text-4xl font-bold text-secondary mb-6 text-center">
        Notes
      </h1>

      <div className="mb-6">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search notes..."
          className="border rounded-md p-2 w-full md:w-1/3 mb-4"
        />
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <SubjectDropdown
          subjects={subjectsData}
          onChange={handleSubjectChange}
          className="flex-1"
        />
        <button
          onClick={handleUploadClick}
          className="bg-accent text-white px-4 py-2 rounded-md shadow-md hover:bg-secondary transition-all"
        >
          Upload
        </button>
      </div>

      {error ? (
        <ErrorMessage message={error.message} />
      ) : selectedSubject && notesToDisplay.length > 0 ? (
        <NoteList
          notes={notesToDisplay}
          onRatingChange={handleRatingChange}
          user={user}
          bestNoteId={bestNote?.note_id} // Pass the ID of the best note
          totalRecords={totalRecords} // Total number of records
          first={pagination.first}
          rows={pagination.rows}
          onPageChange={handlePageChange}
        />
      ) : (
        <p className="text-center text-text">
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
