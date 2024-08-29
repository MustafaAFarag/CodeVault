/* eslint-disable react/prop-types */
import { capitalizeFirstLetter } from '../../utils/helpers';

const UsersList = ({ users, searchTerm, setSearchTerm }) => {
  const filteredUsers = users
    .filter((user) =>
      user.full_name.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    .slice(0, 100);

  return (
    <div className="row-span-2 max-h-[605px] overflow-hidden rounded-lg bg-white p-6 shadow-md">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-2xl font-semibold">First 100 Users</h2>
        <input
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="rounded-lg border border-gray-300 px-2 py-1"
        />
      </div>
      <ul className="custom-scrollbar max-h-[530px] overflow-y-auto">
        {filteredUsers.map((user) => (
          <>
            <li
              key={user.id}
              className="flex items-center gap-4 border-b border-gray-300 py-2"
            >
              <span className="w-1/2 truncate text-xl">
                {capitalizeFirstLetter(user.full_name)}
              </span>
              <span className="w-1/4 text-lg text-gray-600">
                {capitalizeFirstLetter(
                  user.role === 'super_admin'
                    ? 'Owner'
                    : user.role.toLowerCase(),
                )}
              </span>
              <img
                className="aspect-square h-12 w-12 rounded-full object-cover object-center outline-2 outline-teal-500"
                src={user.avatar || 'default-user.jpg'}
                alt={`Avatar of ${user.full_name}`}
              />
            </li>
            <li
              key={user.id}
              className="flex items-center gap-4 border-b border-gray-300 py-2"
            >
              <span className="w-1/2 truncate text-xl">
                {capitalizeFirstLetter(user.full_name)}
              </span>
              <span className="w-1/4 text-lg text-gray-600">
                {capitalizeFirstLetter(
                  user.role === 'super_admin'
                    ? 'Owner'
                    : user.role.toLowerCase(),
                )}
              </span>
              <img
                className="aspect-square h-12 w-12 rounded-full object-cover object-center outline-2 outline-teal-500"
                src={user.avatar || 'default-user.jpg'}
                alt={`Avatar of ${user.full_name}`}
              />
            </li>
            <li
              key={user.id}
              className="flex items-center gap-4 border-b border-gray-300 py-2"
            >
              <span className="w-1/2 truncate text-xl">
                {capitalizeFirstLetter(user.full_name)}
              </span>
              <span className="w-1/4 text-lg text-gray-600">
                {capitalizeFirstLetter(
                  user.role === 'super_admin'
                    ? 'Owner'
                    : user.role.toLowerCase(),
                )}
              </span>
              <img
                className="aspect-square h-12 w-12 rounded-full object-cover object-center outline-2 outline-teal-500"
                src={user.avatar || 'default-user.jpg'}
                alt={`Avatar of ${user.full_name}`}
              />
            </li>
          </>
        ))}
      </ul>
    </div>
  );
};

export default UsersList;
