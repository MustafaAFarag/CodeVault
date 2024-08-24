/* eslint-disable react/prop-types */
function SheetList({ sheets, onDelete, user }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {sheets.map((sheet) => (
        <div
          key={sheet.id}
          className="bg-white p-4 rounded-lg shadow-md border border-border transition-all duration-300 hover:shadow-lg"
        >
          <a
            href={sheet.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block transition-all duration-300 text-white bg-accent hover:bg-blue-600 rounded-lg py-2 text-center"
          >
            {sheet.title}
          </a>
          <div className="mt-4 flex justify-end">
            {user?.role === 'admin' || user?.role === 'super_admin' ? (
              <button
                onClick={() => onDelete(sheet.id)}
                className="bg-red-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-red-600 transition-all"
              >
                Delete
              </button>
            ) : null}
          </div>
        </div>
      ))}
    </div>
  );
}

export default SheetList;
