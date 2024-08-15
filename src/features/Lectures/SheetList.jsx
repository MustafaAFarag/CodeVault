/* eslint-disable react/prop-types */
function SheetList({ sheets }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {sheets.map((sheet) => (
        <div
          key={sheet.id}
          className="bg-gray-800 p-4 rounded-lg shadow-lg border border-gray-700 transition-all duration-300 hover:shadow-xl"
        >
          <a
            href={sheet.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block transition-all duration-300 text-white bg-blue-600 hover:bg-blue-700 rounded-lg py-2 text-center"
          >
            {sheet.title}
          </a>
        </div>
      ))}
    </div>
  );
}

export default SheetList;
