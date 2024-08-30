/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';

const Top5Users = ({ top5Users }) => (
  <div className="flex max-h-[310px] flex-col rounded-lg bg-white p-4 shadow-md sm:p-6">
    <h2 className="mb-5 text-2xl font-semibold">
      Top 5 Users by Uploaded Notes
    </h2>
    <ul className="flex-grow overflow-y-auto">
      {top5Users.map((user, index) => (
        <li
          key={user.id}
          className="flex items-center border-b border-gray-300 py-2 text-xl"
        >
          {index === 0 && (
            <i
              className="pi pi-star-fill mr-2 text-yellow-400"
              title="1st Place"
            ></i>
          )}
          {index === 1 && (
            <i
              className="pi pi-star-fill mr-2 text-gray-400"
              title="2nd Place"
            ></i>
          )}
          {index === 2 && (
            <i
              className="pi pi-star-fill mr-2 text-amber-700"
              title="3rd Place"
            ></i>
          )}
          <span className="flex-grow">{user.full_name}</span>
          <span className="font-semibold">{user.uploadedNotesCount}</span>
        </li>
      ))}
    </ul>
    <Link
      className="mt-4 rounded bg-secondary p-4 text-center text-xl font-semibold text-text shadow-lg transition-all duration-300 hover:bg-accent"
      to="/notes"
    >
      Upload your Notes!
    </Link>
  </div>
);

export default Top5Users;
