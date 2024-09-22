/* eslint-disable react/prop-types */
import { capitalizeFirstLetter } from '../../utils/helpers';

import { useMemo } from 'react';

const UsersList = ({ users, searchTerm, setSearchTerm }) => {
  const sortedUsers = useMemo(() => {
    return users
      .sort((a, b) => new Date(a.created_at) - new Date(b.created_at))
      .filter((user) =>
        user.full_name.toLowerCase().includes(searchTerm.toLowerCase()),
      )
      .slice(0, 100);
  }, [users, searchTerm]);

  return (
    <div className="row-span-2 max-h-[300px] overflow-hidden rounded-lg bg-white p-4 shadow-md sm:p-6 md:row-span-2 md:max-h-[600px] lg:max-h-[6100px] xl:max-h-[600px] 2xl:max-h-[650px]">
      <div className="mb-4 flex flex-col">
        <h2 className="text-2xl font-semibold">First 100 Users</h2>
        <input
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="rounded-lg border border-gray-300 px-2 py-1 text-xl"
        />
      </div>
      <ul className="custom-scrollbar max-h-[230px] overflow-y-auto md:max-h-[500px] lg:max-h-[530px] xl:max-h-[580px]">
        {sortedUsers.map((user, index) => (
          <li
            key={user.id}
            className="flex items-center justify-between gap-4 border-b border-gray-300 py-2"
          >
            {/* User Name */}
            <span className="flex w-1/2 gap-3 truncate text-xl">
              <span className="text-lg font-medium text-gray-500">
                {index + 1}.
              </span>
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
