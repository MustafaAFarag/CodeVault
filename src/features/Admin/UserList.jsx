/* eslint-disable react/prop-types */
import { useState } from 'react';
import { Paginator } from 'primereact/paginator';
import { UserListItem } from './UserListItem';

export function UserList({
  users,
  search,
  currentUserRole,
  onRoleChange,
  onSuspendToggle,
}) {
  // State to manage pagination
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(5);

  const filteredUsers =
    search.length >= 3
      ? users
          .filter((user) =>
            user.full_name.toLowerCase().includes(search.toLowerCase()),
          )
          .filter((user) => {
            if (user.role === 'super_admin') return false;
            if (user.role === 'admin' && currentUserRole === 'admin')
              return false;
            return true;
          })
      : users.filter((user) => {
          if (user.role === 'super_admin') return false;
          if (user.role === 'admin' && currentUserRole === 'admin')
            return false;
          return true;
        });

  const sortedUsers = filteredUsers.sort((a, b) => {
    const roleOrder = { admin: 1, verified: 2, basic: 3 };
    return roleOrder[a.role] - roleOrder[b.role];
  });

  // Get the current page of users
  const currentUsers = sortedUsers.slice(first, first + rows);

  const onPageChange = (event) => {
    setFirst(event.first);
    setRows(event.rows);
  };

  return (
    <div className="rounded-lg bg-white p-6 shadow-md">
      <ul className="space-y-6">
        {currentUsers.length > 0
          ? currentUsers.map((user) => (
              <UserListItem
                key={user.id}
                user={user}
                currentUserRole={currentUserRole}
                onRoleChange={onRoleChange}
                onSuspendToggle={onSuspendToggle}
              />
            ))
          : search.length >= 3 && (
              <li className="text-center text-xl font-semibold text-gray-500">
                No users found
              </li>
            )}
      </ul>

      {/* Paginator Component */}
      <Paginator
        first={first}
        rows={rows}
        totalRecords={sortedUsers.length}
        onPageChange={onPageChange}
        className="mt-6"
      />
    </div>
  );
}
