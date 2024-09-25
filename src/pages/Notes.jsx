import { useState, useMemo, useCallback } from 'react';
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
import { useNotes } from '../features/Notes/useNotes';
import { useSelectedSubject } from '../features/Notes/useSelectedSubject';
import ErrorMessage from '../ui/ErrorMessage';
import { useFilteredNotes } from '../features/Notes/useFilteredNotes';
import { toast } from 'react-hot-toast';

function Notes() {
  const [isUploading, setIsUploading] = useState(false);
  const [page, setPage] = useState(0);
  const [rows, setRows] = useState(6);
  const [isDeletingNoteId, setIsDeletingNoteId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const { deleteMutation } = useNotes();

  const handleDeleteNote = useCallback(
    (noteId) => {
      setIsDeletingNoteId(noteId);
      deleteMutation.mutate(noteId, {
        onError: (error) => {
          toast.error(`Failed to delete note: ${error.message}`);
          setIsDeletingNoteId(null);
        },
        onSuccess: () => {
          setIsDeletingNoteId(null);
        },
      });
    },
    [deleteMutation],
  );

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
  } = useNoteForm(user);

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

  const searchedNotes = useMemo(() => {
    return filteredNotes.filter(
      (note) =>
        note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        note.description.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [filteredNotes, searchQuery]);

  const sortedNotes = useMemo(() => {
    return searchedNotes.sort((a, b) => b.average_rating - a.average_rating);
  }, [searchedNotes]);

  const bestNote = useMemo(() => {
    return sortedNotes.length > 0 ? sortedNotes[0] : null;
  }, [sortedNotes]);

  const totalRecords = sortedNotes.length;
  const notesToDisplay = sortedNotes.slice(page * rows, (page + 1) * rows);

  const handlePageChange = (event) => {
    setPage(event.first / event.rows);
    setRows(event.rows);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsUploading(true);

    try {
      const noteData = {
        ...formValues,
        user_id: user.id,
        author: user.full_name,
      };
      await uploadMutation.mutateAsync(noteData);
      toast.success('Note uploaded successfully!');
      clearFormValues();
      handleCloseModal();
    } catch (error) {
      toast.error(`Error: ${error.message}`);
    } finally {
      setIsUploading(false);
    }
  };

  const canUpload =
    user.role === 'admin' ||
    user.role === 'super_admin' ||
    user.role === 'verified';

  if (isLoading || subjectsLoading) return <NotesLoader />;
  if (subjectsError) return <ErrorMessage message={subjectsError.message} />;

  return (
    <div className="h-full bg-gray-50 p-8 lg:h-auto">
      <h1 className="mb-6 mt-10 text-center text-4xl font-bold text-teal-600 sm:text-5xl md:text-6xl lg:text-7xl xl:text-7xl">
        Notes
      </h1>

      <div className="mb-8 flex flex-col items-center justify-between md:flex-row">
        <SubjectDropdown
          subjects={subjectsData}
          onChange={handleSubjectChange}
          title="Select a Subject"
        />

        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search notes..."
          className="mb-4 w-full rounded-lg border border-gray-300 p-3 text-xl md:w-1/2 md:translate-y-5"
        />

        {canUpload && (
          <button
            onClick={handleUploadClick}
            className="w-full translate-y-3 rounded-lg bg-secondary px-4 py-2 text-lg font-semibold text-text shadow-lg transition-all hover:bg-accent md:w-auto md:px-5 md:py-3 lg:text-2xl"
          >
            Upload
          </button>
        )}
      </div>

      {error ? (
        <ErrorMessage message={error.message} />
      ) : selectedSubject && notesToDisplay.length > 0 ? (
        <NoteList
          notes={notesToDisplay}
          onRatingChange={handleRatingChange}
          user={user}
          bestNoteId={bestNote?.note_id}
          totalRecords={totalRecords}
          first={page * rows}
          rows={rows}
          onPageChange={handlePageChange}
          handleDeleteNote={handleDeleteNote}
          isDeletingNoteId={isDeletingNoteId}
        />
      ) : (
        <p className="text-center font-semibold text-gray-600 md:text-xl">
          {selectedSubject
            ? 'No notes uploaded for this subject.'
            : 'Please select a subject to view notes.'}
        </p>
      )}

      <UploadNoteModal
        isOpen={isModalOpen}
        onClose={() => {
          handleCloseModal();
          clearFormValues();
        }}
        onSubmit={handleSubmit}
        formValues={formValues}
        handleChange={handleChange}
        isUploading={isUploading}
        user={user}
        subjects={subjectsData}
      />
    </div>
  );
}

export default Notes;
