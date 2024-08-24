/* eslint-disable react/prop-types */
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import Spinner from './Spinner';
import SubjectDropdown from '../features/Sheets/SubjectDropdown';
import SheetList from '../features/Sheets/SheetList';
import NoSheetsMessage from '../features/Sheets/NoSheetsMessage';
import { useSheetsForm } from '../features/Sheets/useSheetsForm';
import { useUser } from '../features/authentication/useUser';
import UploadSheetsModal from './UploadSheetsModal';

function SheetsPage({ title, queryKey, queryFn, uploadFn }) {
  const { user } = useUser();
  const queryClient = useQueryClient();
  const {
    formValues,
    handleChange,
    handleSubmit,
    isModalOpen,
    handleUploadClick,
    handleCloseModal,
  } = useSheetsForm();

  const { data, error, isLoading } = useQuery({
    queryKey: [queryKey],
    queryFn,
  });

  const uploadMutation = useMutation({
    mutationFn: uploadFn,
    onSuccess: () => {
      queryClient.invalidateQueries([queryKey]);
      handleCloseModal();
    },
    onError: (error) => {
      console.error('Upload failed:', error.message);
      alert('There was an error uploading the sheet. Please try again.');
    },
  });

  const [selectedSubject, setSelectedSubject] = useState(null);

  if (isLoading) return <Spinner />;

  if (error)
    return <p className="text-center text-red-500">Error: {error.message}</p>;

  const { subjectsData, sheetsBySubject } = data;

  function handleSubjectChange(event) {
    const subjectId = event.target.value;
    setSelectedSubject(subjectId);
  }

  return (
    <div className="p-6 bg-background min-h-screen">
      <h1 className="text-4xl font-bold text-primary mb-6 text-center">
        {title}
      </h1>

      <SubjectDropdown subjects={subjectsData} onChange={handleSubjectChange} />

      {!selectedSubject && (
        <p className="text-center text-text">
          Please select a subject to view {title.toLowerCase()}
        </p>
      )}

      {selectedSubject &&
        sheetsBySubject[selectedSubject] &&
        sheetsBySubject[selectedSubject].length > 0 && (
          <SheetList sheets={sheetsBySubject[selectedSubject]} />
        )}

      {selectedSubject && !sheetsBySubject[selectedSubject] && (
        <NoSheetsMessage />
      )}

      {/* Conditionally render the upload button for admins or super admins */}
      {user?.role === 'admin' || user?.role === 'super_admin' ? (
        <div className="flex justify-end mt-4">
          <button
            onClick={handleUploadClick}
            className="bg-accent text-white px-4 py-2 rounded-md shadow-md hover:bg-opacity-80 transition-all"
          >
            Upload New Sheet
          </button>
        </div>
      ) : null}

      <UploadSheetsModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={(e) => handleSubmit(e, uploadMutation)}
        formValues={formValues}
        subjects={subjectsData}
        handleChange={handleChange}
        isUploading={uploadMutation.isLoading}
      />
    </div>
  );
}

export default SheetsPage;
