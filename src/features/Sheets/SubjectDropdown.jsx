/* eslint-disable react/prop-types */
function SubjectDropdown({ subjects, onChange, title }) {
  return (
    <div className="mb-6">
      <label className="text-primary font-semibold mr-4">Select Subject:</label>
      <select
        onChange={onChange}
        className="bg-white text-text px-4 py-2 rounded-md border border-border shadow-sm"
      >
        <option value="">{title}</option>
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
