/* eslint-disable react/prop-types */
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useState, useMemo } from 'react';
import { toast } from 'react-hot-toast';
import SubjectDropdown from './SubjectDropdown';
import SheetList from './SheetList';
import { useSheetsForm } from './useSheetsForm';
import { useUser } from '../authentication/useUser';
import UploadSheetsModal from './UploadSheetsModal';
import NotesLoader from '../../ui/NotesLoader';
import ErrorMessage from '../../ui/ErrorMessage';

function SheetsPage({ title, queryKey, queryFn, uploadFn, deleteFn }) {
  const { user } = useUser();
  const queryClient = useQueryClient();
  const {
    formValues,
    handleChange,
    handleSubmit,
    isModalOpen,
    handleUploadClick,
    handleCloseModal,
    clearFormValues,
  } = useSheetsForm();

  const [isUploading, setIsUploading] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [pagination, setPagination] = useState({
    first: 0,
    rows: 6,
  });

  const { data, error, isLoading } = useQuery({
    queryKey: [queryKey],
    queryFn,
  });

  const uploadMutation = useMutation({
    mutationFn: uploadFn,
    onMutate: () => {
      setIsUploading(true);
    },
    onSuccess: () => {
      queryClient.invalidateQueries([queryKey]);
      handleCloseModal();
      setIsUploading(false);
      toast.success('Sheet uploaded successfully!');
      clearFormValues();
    },
    onError: (error) => {
      console.error('Upload failed:', error.message);
      toast.error('There was an error uploading the sheet. Please try again.');
      setIsUploading(false);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteFn,
    onSuccess: () => {
      queryClient.invalidateQueries([queryKey]);
      toast.success('Sheet deleted successfully.');
    },
    onError: (error) => {
      console.error('Delete failed:', error.message);
      toast.error('There was an error deleting the sheet. Please try again.');
    },
  });

  function handleDelete(sheetId) {
    deleteMutation.mutate(sheetId);
  }

  function handleSubjectChange(event) {
    const subjectId = event.target.value;
    setSelectedSubject(subjectId);
    setPagination({ first: 0, rows: 6 });
  }

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setPagination({ first: 0, rows: 6 });
  };

  const handlePageChange = (event) => {
    setPagination({
      first: event.first,
      rows: event.rows,
    });
  };

  const filteredSheets = useMemo(() => {
    if (!data || !data.sheetsBySubject || !selectedSubject) return [];

    return (
      data.sheetsBySubject[selectedSubject]?.filter((sheet) =>
        sheet.title.toLowerCase().includes(searchQuery.toLowerCase()),
      ) || []
    );
  }, [data, selectedSubject, searchQuery]);

  const sortedSheets = useMemo(() => {
    return [...filteredSheets].sort(
      (a, b) => b.average_rating - a.average_rating,
    );
  }, [filteredSheets]);

  const sheetsToDisplay = sortedSheets.slice(
    pagination.first,
    pagination.first + pagination.rows,
  );

  if (isLoading) return <NotesLoader />;
  if (error) return <ErrorMessage message={error.message} />;

  const { subjectsData } = data;

  return (
    <div className="bg-gray-50 p-8 lg:h-[780px]">
      <h1 className="mb-6 mt-10 text-center text-4xl font-bold text-teal-600 sm:text-5xl md:text-6xl lg:text-7xl">
        {title}
      </h1>

      <div className="mb-8 flex flex-col items-center justify-between md:flex-row">
        <SubjectDropdown
          subjects={subjectsData}
          onChange={handleSubjectChange}
          title="-- Select a Subject --"
        />

        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search sheets..."
          className="mb-4 w-full rounded-lg border border-gray-300 p-3 text-xl md:w-1/2 md:translate-y-5"
        />

        <button
          onClick={handleUploadClick}
          className="w-full rounded-lg bg-secondary px-4 py-2 text-lg font-semibold text-text shadow-lg transition-all hover:bg-accent md:px-5 md:py-3 lg:w-auto lg:translate-y-3 lg:text-2xl"
        >
          Upload
        </button>
      </div>

      {selectedSubject && sheetsToDisplay.length > 0 ? (
        <SheetList
          sheets={sheetsToDisplay}
          onDelete={handleDelete}
          user={user}
          totalRecords={sortedSheets.length}
          first={pagination.first}
          rows={pagination.rows}
          onPageChange={handlePageChange}
        />
      ) : (
        <p className="text-center font-semibold text-gray-600 md:text-xl">
          {selectedSubject
            ? 'No sheets available for this subject.'
            : 'Please select a subject to view sheets.'}
        </p>
      )}

      <UploadSheetsModal
        isOpen={isModalOpen}
        onClose={() => {
          handleCloseModal();
          clearFormValues();
        }}
        onSubmit={(e) => handleSubmit(e, uploadMutation)}
        formValues={formValues}
        subjects={subjectsData}
        handleChange={handleChange}
        isUploading={isUploading}
        title={title}
      />
    </div>
  );
}

export default SheetsPage;
