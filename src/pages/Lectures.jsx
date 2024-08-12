import { useEffect, useState } from 'react';
import { fetchLecturesAndSheets } from '../services/apiLectures';

function Lectures() {
  const [subjects, setSubjects] = useState([]);
  const [sheetsBySubject, setSheetsBySubject] = useState({});
  const [loading, setLoading] = useState(true);
  const [openSubjects, setOpenSubjects] = useState({});

  useEffect(() => {
    async function loadData() {
      try {
        const { subjectsData, sheetsBySubject } =
          await fetchLecturesAndSheets();
        setSubjects(subjectsData);
        setSheetsBySubject(sheetsBySubject);
      } catch (error) {
        console.error('Failed to load data:', error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  if (loading) return <p>Loading...</p>;

  const handleToggleDropdown = (subjectId) => {
    setOpenSubjects((prev) => ({
      ...prev,
      [subjectId]: !prev[subjectId],
    }));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {subjects.map((subject) => (
        <div key={subject.id} className="mb-5 border rounded-lg shadow-md">
          <h3
            className="p-4 cursor-pointer flex justify-between items-center"
            onClick={() => handleToggleDropdown(subject.id)}
            aria-expanded={openSubjects[subject.id]}
            aria-controls={`dropdown-${subject.id}`}
          >
            {subject.name}
            <span
              className={`transform transition-transform duration-300 ${
                openSubjects[subject.id] ? 'rotate-180' : ''
              }`}
            >
              ▼
            </span>
          </h3>
          <div
            id={`dropdown-${subject.id}`}
            className={`transition-all duration-300 overflow-hidden ${
              openSubjects[subject.id] ? 'max-h-screen' : 'max-h-0'
            }`}
            aria-hidden={!openSubjects[subject.id]}
          >
            <ul className="p-4 bg-gray-100 rounded-b-lg">
              {sheetsBySubject[subject.id]?.length > 0 ? (
                sheetsBySubject[subject.id].map((sheet) => (
                  <li key={sheet.id} className="mb-2">
                    <a
                      href={sheet.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      {sheet.title}
                    </a>
                  </li>
                ))
              ) : (
                <p>No sheets available</p>
              )}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Lectures;
