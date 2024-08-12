import { fetchLecturesAndSheets } from '../services/apiLectures';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

function Lectures() {
  const { data, error, isLoading } = useQuery({
    queryKey: ['lecturesAndSheets'],
    queryFn: fetchLecturesAndSheets,
  });

  const [openSubject, setOpenSubject] = useState(null);

  if (isLoading) return <p className="text-center text-gray-600">Loading...</p>;
  if (error)
    return <p className="text-center text-red-500">Error: {error.message}</p>;

  const { subjectsData, sheetsBySubject } = data;

  const toggleDropdown = (subjectId) => {
    setOpenSubject((prevOpenSubject) =>
      prevOpenSubject === subjectId ? null : subjectId,
    );
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold text-gray-800">Lectures</h1>
        <button className="bg-red-500 text-white font-semibold rounded-md px-4 py-2 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition-colors duration-300">
          Upload
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {subjectsData.map((subject) => (
          <div
            key={subject.id}
            className="bg-white p-4 rounded-lg shadow-lg border border-gray-300 flex flex-col justify-between h-full transition-shadow duration-300 hover:shadow-xl relative"
          >
            <div>
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => toggleDropdown(subject.id)}
              >
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                  {subject.name}
                </h2>
                {openSubject === subject.id ? (
                  <FaChevronUp className="text-gray-500" />
                ) : (
                  <FaChevronDown className="text-gray-500" />
                )}
              </div>
              <div
                className={`overflow-hidden transition-max-height duration-500 ease-in-out absolute left-0 right-0 bg-white z-10 ${
                  openSubject === subject.id ? 'max-h-screen' : 'max-h-0'
                }`}
                style={{
                  maxHeight:
                    openSubject === subject.id
                      ? `${sheetsBySubject[subject.id]?.length * 4}rem`
                      : '0px',
                }}
              >
                <ul className="flex flex-col gap-3 mt-4 p-4">
                  {sheetsBySubject[subject.id]?.map((sheet) => (
                    <li key={sheet.id}>
                      <a
                        href={sheet.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-white bg-blue-500 hover:bg-blue-600 rounded-lg  py-2 transition-colors duration-300 text-center"
                      >
                        {sheet.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Lectures;
