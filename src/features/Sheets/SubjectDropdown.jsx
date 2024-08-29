/* eslint-disable react/prop-types */

function SubjectDropdown({ subjects, onChange, title, required }) {
  return (
    <div className="mb-4">
      <label className="mb-1 block text-center text-2xl font-semibold text-teal-600 lg:text-left">
        Select Subject:
        {required && <span className="text-red-500">*</span>}
      </label>
      <select
        onChange={onChange}
        className="mt-1 block w-full rounded-lg border border-gray-300 p-3 text-xl font-medium text-text shadow-sm transition duration-200 focus:border-teal-500 focus:ring-teal-500"
        required={required}
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
