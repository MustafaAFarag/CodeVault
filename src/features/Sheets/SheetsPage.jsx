/* eslint-disable react/prop-types */
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import Spinner from '../../ui/Spinner';
import SubjectDropdown from './SubjectDropdown';
import SheetList from './SheetList';
import NoSheetsMessage from './NoSheetsMessage';
import { useSheetsForm } from './useSheetsForm';
import { useUser } from '../authentication/useUser';
import UploadSheetsModal from './UploadSheetsModal';
import { toast } from 'react-hot-toast';

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
  } = useSheetsForm();

  const [isUploading, setIsUploading] = useState(false);

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
      <div className="flex items-center justify-between">
        <SubjectDropdown
          subjects={subjectsData}
          onChange={handleSubjectChange}
          title="-- Select a Subject --"
        />
        {user?.role === 'admin' || user?.role === 'super_admin' ? (
          <div className="flex justify-end mt-4">
            <button
              onClick={handleUploadClick}
              className="bg-accent text-white px-4 py-2 rounded-md shadow-md hover:bg-opacity-80 transition-all"
            >
              Upload
            </button>
          </div>
        ) : null}
      </div>
      {!selectedSubject && (
        <p className="text-center text-text">
          Please select a subject to view {title.toLowerCase()}
        </p>
      )}
      {selectedSubject &&
        sheetsBySubject[selectedSubject] &&
        sheetsBySubject[selectedSubject].length > 0 && (
          <SheetList
            sheets={sheetsBySubject[selectedSubject]}
            onDelete={handleDelete}
            user={user}
          />
        )}
      {selectedSubject && !sheetsBySubject[selectedSubject] && (
        <NoSheetsMessage />
      )}

      <UploadSheetsModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
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
