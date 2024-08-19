/* eslint-disable react/prop-types */
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import Spinner from './Spinner';
import SubjectDropdown from '../features/Sheets/SubjectDropdown';
import SheetList from '../features/Sheets/SheetList';
import NoSheetsMessage from '../features/Sheets/NoSheetsMessage';

function SheetsPage({ title, queryKey, queryFn }) {
  const { data, error, isLoading } = useQuery({
    queryKey: [queryKey],
    queryFn,
  });

  const [selectedSubject, setSelectedSubject] = useState(null);

  if (isLoading) return <Spinner />;

  if (error)
    return <p className="text-center text-red-400">Error: {error.message}</p>;

  const { subjectsData, sheetsBySubject } = data;

  function handleSubjectChange(event) {
    const subjectId = event.target.value;
    setSelectedSubject(subjectId);
  }

  return (
    <div className="p-6 bg-gray-900 min-h-screen">
      <h1 className="text-4xl font-bold text-white mb-6 text-center">
        {title}
      </h1>

      <SubjectDropdown subjects={subjectsData} onChange={handleSubjectChange} />

      {!selectedSubject && (
        <p className="text-center text-gray-400">
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
    </div>
  );
}

export default SheetsPage;
