/* eslint-disable react/prop-types */
const Top5Notes = ({ top5Notes }) => (
  <div className="max-h-[300px] overflow-y-auto rounded-lg bg-white p-4 shadow-md sm:p-6">
    <h2 className="mb-4 text-2xl font-semibold">Top 5 Most Rated Notes</h2>
    <ul>
      {top5Notes.map((note, index) => (
        <li
          key={note.id}
          className="flex items-start border-b border-gray-300 py-2"
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
            <div className="text-xl font-semibold">{note.title}</div>
            <div className="text-lg text-text">
              Average Rating: {note.average_rating} -{' '}
              {note.users?.full_name || ''}
            </div>
          </div>
        </li>
      ))}
    </ul>
  </div>
);

export default Top5Notes;
