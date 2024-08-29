/* eslint-disable react/prop-types */

function SubjectDropdown({ subjects, onChange, title, required }) {
  return (
    <div className="mb-4">
      <label className="text-teal-600 text-2xl font-semibold text-center lg:text-left mb-1 block">
        Select Subject:
        {required && <span className="text-red-500">*</span>}
      </label>
      <select
        onChange={onChange}
        className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-3 text-text text-xl font-medium focus:ring-teal-500 focus:border-teal-500 transition duration-200"
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
