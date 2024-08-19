/* eslint-disable react/prop-types */
function SubjectDropdown({ subjects, onChange }) {
  console.log(subjects);
  return (
    <div className="mb-6">
      <label className="text-white font-semibold mr-4"> Select Subject:</label>
      <select
        onChange={onChange}
        className="bg-gray-800 text-white px-4 py-2 rounded-md"
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
