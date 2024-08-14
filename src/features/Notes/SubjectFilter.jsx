/* eslint-disable react/prop-types */

import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

function SubjectFilter({
  subjects,
  selectedSubject,
  onSubjectChange,
  isOpen,
  onToggle,
}) {
  return (
    <div className="relative">
      <button
        onClick={onToggle}
        className="bg-gray-700 text-white px-4 py-2 rounded-md font-semibold text-sm flex items-center hover:bg-gray-600 transition-all duration-300"
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        {selectedSubject || 'Loading...'}
        {isOpen ? (
          <FaChevronUp className="ml-2" />
        ) : (
          <FaChevronDown className="ml-2" />
        )}
      </button>

      {isOpen && subjects.length > 0 && (
        <div className="absolute right-0 mt-2 w-48 bg-gray-800 text-white rounded-md shadow-lg z-10">
          {subjects.map((subject) => (
            <button
              key={subject.id} // Use `subject.id` as the unique key
              onClick={() => onSubjectChange(subject.name)} // Pass `subject.name` to `onSubjectChange`
              className={`block w-full text-left px-4 py-2 rounded-md font-semibold text-sm ${
                selectedSubject === subject.name
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-300'
              } hover:bg-blue-700 transition-all duration-300`}
            >
              {subject.name} 
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default SubjectFilter;
