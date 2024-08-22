import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchAllUsers } from '../services/apiAuth';

function AdminPanel() {
  const [search, setSearch] = useState('');

  const {
    data: users = [],
    error,
    isLoading,
  } = useQuery({
    queryKey: ['users'],
    queryFn: fetchAllUsers,
  });

  // Filter users based on the search query only if at least 3 characters are typed
  const filteredUsers =
    search.length >= 3
      ? users.filter((user) =>
          user.full_name.toLowerCase().includes(search.toLowerCase()),
        )
      : users;

  if (isLoading)
    return <div className="text-center text-gray-500">Loading...</div>;
  if (error)
    return (
      <div className="text-center text-red-500">Error: {error.message}</div>
    );

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">Admin Panel</h1>
      <div className="bg-white shadow-md rounded-lg p-6 mb-4">
        <input
          type="text"
          placeholder="Search by full name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2 w-full mb-4"
        />
        <ul className="space-y-4">
          {filteredUsers.length > 0
            ? filteredUsers.map((user) => (
                <li
                  key={user.id}
                  className="flex items-center justify-between p-4 border-b border-gray-300"
                >
                  <div className="flex-1">
                    <div className="font-semibold text-lg">
                      {user.full_name}
                    </div>
                    <div className="text-gray-600">{user.role}</div>
                    <div className="text-gray-500 text-sm">
                      {new Date(user.created_at).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="space-x-4">
                    <select className="border border-gray-300 rounded px-2 py-1 bg-white">
                      <option>basic</option>
                      <option>verified</option>
                      <option>admin</option>
                      <option>super_admin</option>
                    </select>
                    <input
                      type="text"
                      placeholder="Additional Info"
                      className="border border-gray-300 rounded px-2 py-1 bg-white"
                    />
                  </div>
                </li>
              ))
            : search.length >= 3 && (
                <li className="text-gray-500">No users found</li>
              )}
        </ul>
      </div>
    </div>
  );
}

export default AdminPanel;
