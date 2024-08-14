import { fetchLecturesAndSheets } from '../services/apiLectures';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import Spinner from '../ui/Spinner';

function Lectures() {
  const { data, error, isLoading } = useQuery({
    queryKey: ['lecturesAndSheets'],
    queryFn: fetchLecturesAndSheets,
  });

  const [selectedSubject, setSelectedSubject] = useState(null);

  if (isLoading) return <Spinner />;

  if (error)
    return <p className="text-center text-red-400">Error: {error.message}</p>;

  const { subjectsData, sheetsBySubject } = data;

  const handleSubjectChange = (event) => {
    const subjectId = event.target.value;
    setSelectedSubject(subjectId);
  };

  return (
    <div className="p-6 bg-gray-900 min-h-screen">
      <h1 className="text-4xl font-bold text-white mb-6 text-center">
        Lectures
      </h1>

      {/* Subject Filter Dropdown */}
      <div className="mb-6">
        <label className="text-white font-semibold mr-4">Select Subject:</label>
        <select
          onChange={handleSubjectChange}
          className="bg-gray-800 text-white px-4 py-2 rounded-md"
        >
          <option value="">-- Select a Subject --</option>
          {subjectsData.map((subject) => (
            <option key={subject.id} value={subject.id}>
              {subject.name}
            </option>
          ))}
        </select>
      </div>

      {/* Display Sheets for Selected Subject */}
      {selectedSubject && sheetsBySubject[selectedSubject]?.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sheetsBySubject[selectedSubject].map((sheet) => (
            <div
              key={sheet.id}
              className="bg-gray-800 p-4 rounded-lg shadow-lg border border-gray-700 transition-shadow duration-300 hover:shadow-xl"
            >
              <a
                href={sheet.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-white bg-blue-600 hover:bg-blue-700 rounded-lg py-2 text-center transition-colors duration-300"
              >
                {sheet.title}
              </a>
            </div>
          ))}
        </div>
      )}

      {/* No Sheets Message */}
      {selectedSubject && sheetsBySubject[selectedSubject]?.length === 0 && (
        <p className="text-center text-white">
          No sheets available for this subject.
        </p>
      )}
    </div>
  );
}

export default Lectures;
