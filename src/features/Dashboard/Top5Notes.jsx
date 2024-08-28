/* eslint-disable react/prop-types */
const Top5Notes = ({ top5Notes }) => (
  <div className="bg-white shadow-md rounded-lg p-6 max-h-[300px] overflow-y-auto">
    <h2 className="text-2xl font-semibold mb-4">Top 5 Most Rated Notes</h2>
    <ul>
      {top5Notes.map((note, index) => (
        <li
          key={note.id}
          className="py-2 border-b border-gray-300 flex items-start"
        >
          <div className="mr-2 mt-1">
            {index === 0 && (
              <i
                className="pi pi-star-fill text-yellow-400"
                title="1st Place"
              ></i>
            )}
            {index === 1 && (
              <i
                className="pi pi-star-fill text-gray-400"
                title="2nd Place"
              ></i>
            )}
            {index === 2 && (
              <i
                className="pi pi-star-fill text-amber-700"
                title="3rd Place"
              ></i>
            )}
          </div>
          <div className="flex-grow">
            <div className="font-semibold text-xl">{note.title}</div>
            <div className="text-text text-lg">
              Average Rating: {note.average_rating} - {note.users.full_name}
            </div>
          </div>
        </li>
      ))}
    </ul>
  </div>
);

export default Top5Notes;
