import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchAllUsers, updateUserRole } from '../services/apiAuth';
import { useUser } from '../features/authentication/useUser';

function AdminPanel() {
  const { user } = useUser();
  const [search, setSearch] = useState('');

  const queryClient = useQueryClient();

  const {
    data: users = [],
    error,
    isLoading,
  } = useQuery({
    queryKey: ['users'],
    queryFn: fetchAllUsers,
  });

  const mutation = useMutation({
    mutationFn: updateUserRole,
    onSuccess: () => {
      queryClient.invalidateQueries(['users']);
    },
    onError: (error) => {
      console.error('Role update error:', error.message);
    },
  });

  const handleRoleChange = (userId, newRole) => {
    mutation.mutate({ userId, newRole });
  };

  // Determine available roles based on the current user's role
  const getAvailableRoles = (currentRole, userRole) => {
    if (currentRole === 'super_admin') {
      return ['basic', 'verified', 'admin'];
    }
    if (currentRole === 'admin') {
      return userRole === 'admin' ? ['admin'] : ['basic', 'verified'];
    }
    return []; // For basic users, no role changes allowed
  };

  const currentUserRole = users.find(
    (userData) => userData.id === user.id,
  )?.role;

  // Filter users based on the search query and exclude those with the 'super_admin' role
  const filteredUsers =
    search.length >= 3
      ? users
          .filter((user) =>
            user.full_name.toLowerCase().includes(search.toLowerCase()),
          )
          .filter((user) => user.role !== 'super_admin')
      : users.filter((user) => user.role !== 'super_admin');

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
          {!search && (
            <li
              key={user.id}
              className="flex items-center justify-between p-4 border-b border-gray-300"
            >
              <div className="flex-1">
                <div className="font-semibold text-lg">Mustafa Ashraf</div>
                <div className="text-gray-600">Owner</div>
              </div>
              <p>mustafa.ashraf.saad@gmail.com</p>
            </li>
          )}
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
                    <div className="text-gray-600">
                      {user.role} - {user.email}
                    </div>
                    <div className="text-gray-500 text-sm">
                      {new Date(user.created_at).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="space-x-4">
                    <select
                      value={user.role}
                      onChange={(e) =>
                        handleRoleChange(user.id, e.target.value)
                      }
                      className="border border-gray-300 rounded px-2 py-1 bg-white"
                      disabled={user.role === 'admin'} // Disable dropdown if the role is 'admin'
                    >
                      {getAvailableRoles(currentUserRole, user.role).map(
                        (role) => (
                          <option key={role} value={role}>
                            {role.charAt(0).toUpperCase() + role.slice(1)}
                          </option>
                        ),
                      )}
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
