/* eslint-disable react/prop-types */
import { capitalizeFirstLetter } from '../../utils/helpers';

const UsersList = ({ users, searchTerm, setSearchTerm }) => {
  // Sort users by the 'created_at' column in descending order
  const sortedUsers = users
    .sort((a, b) => new Date(b.created_at) + new Date(a.created_at))
    .filter((user) =>
      user.full_name.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    .slice(0, 100); // Limit to the first 100 users

  return (
    <div className="row-span-2 max-h-[300px] overflow-hidden rounded-lg bg-white p-4 shadow-md sm:p-6 md:row-span-2 md:max-h-[600px] xl:max-h-[600px] 2xl:max-h-[650px]">
      <div className="mb-4 flex items-center justify-between xl:flex">
        <h2 className="text-2xl font-semibold">First 100 Users</h2>
        <input
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="rounded-lg border border-gray-300 px-2 py-1"
        />
      </div>
      <ul className="custom-scrollbar max-h-[230px] overflow-y-auto md:max-h-[500px] xl:max-h-[580px]">
        {sortedUsers.map((user, index) => (
          <li
            key={user.id}
            className="flex items-center gap-4 border-b border-gray-300 py-2"
          >
            {/* Numbered List */}
            <span className="text-lg font-medium text-gray-500">
              {index + 1}.
            </span>
            {/* User Name */}
            <span className="w-1/2 truncate text-xl">
              {capitalizeFirstLetter(user.full_name)}
            </span>
            {/* User Role */}
            <span className="w-1/4 text-lg text-gray-600">
              {capitalizeFirstLetter(
                user.role === 'super_admin' ? 'Owner' : user.role.toLowerCase(),
              )}
            </span>
            {/* User Avatar */}
            <img
              className="aspect-square h-12 w-12 rounded-full object-cover object-center outline-2 outline-teal-500"
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
