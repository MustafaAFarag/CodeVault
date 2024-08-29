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
  const [pagination, setPagination] = useState({
    first: 0,
    rows: 6, // Show 6 notes per page
  });
  const [searchQuery, setSearchQuery] = useState('');

  const { deleteMutation } = useNotes();

  const handleDeleteNote = useCallback(
    (noteId) => {
      deleteMutation.mutate(noteId, {
        onError: (error) => {
          toast.error(`Failed to delete note: ${error.message}`);
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
      const noteData = {
        ...formValues,
        user_id: user.id,
        author: user.full_name, // Assuming the user object has a full_name property
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

  if (isLoading || subjectsLoading) return <NotesLoader />;
  if (subjectsError) return <ErrorMessage message={subjectsError.message} />;

  return (
    <div className="p-8 bg-gray-50 h-[780px]">
      <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-teal-600 mb-6 mt-10 text-center">
        Notes
      </h1>

      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <SubjectDropdown
          subjects={subjectsData}
          onChange={handleSubjectChange}
          title="-- Select a Subject --"
        />

        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search notes..."
          className="border border-gray-300 rounded-lg p-3 md:translate-y-5 w-full md:w-1/2 mb-4 text-xl"
        />

        <button
          onClick={handleUploadClick}
          className="bg-secondary text-text px-4 py-2 md:px-5 md:py-3 rounded-lg hover:bg-accent w-full lg:translate-y-3 lg:w-auto transition-all shadow-lg font-semibold text-lg lg:text-2xl"
        >
          Upload
        </button>
      </div>

      {/* Content of Notes */}
      {error ? (
        <ErrorMessage message={error.message} />
      ) : selectedSubject && notesToDisplay.length > 0 ? (
        <NoteList
          notes={notesToDisplay}
          onRatingChange={handleRatingChange}
          user={user}
          bestNoteId={bestNote?.note_id}
          totalRecords={totalRecords}
          first={pagination.first}
          rows={pagination.rows}
          onPageChange={handlePageChange}
          handleDeleteNote={handleDeleteNote}
        />
      ) : (
        <p className="text-center text-gray-600 font-semibold md:text-xl">
          {selectedSubject
            ? 'No notes available for this subject.'
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
