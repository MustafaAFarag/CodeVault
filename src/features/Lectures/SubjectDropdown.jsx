/* eslint-disable react/prop-types */
function SubjectDropdown({ subjects, onChange }) {
  return (
    <div className="mb-6">
      <label className="mr-4 font-semibold text-white"> Select Subject:</label>
      <select
        onChange={onChange}
        className="rounded-md bg-gray-800 px-4 py-2 text-white"
      >
        <option value="">-- Select a Subject --</option>
        {subjects.map((subject) => (
          <option key={subject.id} value={subject.id}>
            {subject.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SubjectDropdown;
