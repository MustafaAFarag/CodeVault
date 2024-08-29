/* eslint-disable react/prop-types */
function SheetList({ sheets }) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {sheets.map((sheet) => (
        <div
          key={sheet.id}
          className="rounded-lg border border-gray-700 bg-gray-800 p-4 shadow-lg transition-all duration-300 hover:shadow-xl"
        >
          <a
            href={sheet.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block rounded-lg bg-blue-600 py-2 text-center text-white transition-all duration-300 hover:bg-blue-700"
          >
            {sheet.title}
          </a>
        </div>
      ))}
    </div>
  );
}

export default SheetList;
