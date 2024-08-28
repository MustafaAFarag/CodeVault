/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';

const Top5Users = ({ top5Users }) => (
  <div className="bg-white shadow-md rounded-lg p-6 max-h-[300px] flex flex-col">
    <h2 className="text-2xl font-semibold mb-5">
      Top 5 Users by Uploaded Notes
    </h2>
    <ul className="overflow-y-auto flex-grow">
      {top5Users.map((user, index) => (
        <li
          key={user.id}
          className="py-2 border-b border-gray-300 text-xl flex items-center"
        >
          {index === 0 && (
            <i
              className="pi pi-star-fill text-yellow-400 mr-2"
              title="1st Place"
            ></i>
          )}
          {index === 1 && (
            <i
              className="pi pi-star-fill text-gray-400 mr-2"
              title="2nd Place"
            ></i>
          )}
          {index === 2 && (
            <i
              className="pi pi-star-fill text-amber-700 mr-2"
              title="3rd Place"
            ></i>
          )}
          <span className="flex-grow">{user.full_name}</span>
          <span className="font-semibold">{user.uploadedNotesCount}</span>
        </li>
      ))}
    </ul>
    <Link
      className="mt-4 bg-secondary text-text text-center p-4 rounded hover:bg-accent transition-all duration-300 text-xl shadow-lg font-semibold"
      to="/notes"
    >
      Upload your Notes!
    </Link>
  </div>
);

export default Top5Users;
