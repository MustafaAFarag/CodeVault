/* eslint-disable react/prop-types */
import { capitalizeFirstLetter } from '../../utils/helpers';

const UsersList = ({ users, searchTerm, setSearchTerm }) => {
  const filteredUsers = users
    .filter((user) =>
      user.full_name.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    .slice(0, 100);

  return (
    <div className="bg-white shadow-md rounded-lg p-6 overflow-hidden row-span-2 max-h-[430px]">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">First 100 Users</h2>
        <input
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 rounded-lg px-2 py-1"
        />
      </div>
      <ul
        className="custom-scrollbar overflow-y-auto"
        style={{ maxHeight: 'calc(430px - 4rem)' }}
      >
        {filteredUsers.map((user) => (
          <li
            key={user.id}
            className="py-2 border-b border-gray-300 flex items-center gap-4"
          >
            <span className="w-1/2 truncate text-xl">
              {capitalizeFirstLetter(user.full_name)}
            </span>
            <span className="w-1/4 text-gray-600 text-lg">
              {capitalizeFirstLetter(
                user.role === 'super_admin' ? 'Owner' : user.role.toLowerCase(),
              )}
            </span>
            <img
              className="w-12 h-12 aspect-square object-cover object-center rounded-full outline-2 outline-teal-500"
              src={user.avatar || 'default-user.jpg'}
              alt={`Avatar of ${user.full_name}`}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UsersList;
