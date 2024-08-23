/* eslint-disable react/prop-types */

import { UserListItem } from './UserListItem';

export function UserList({
  users,
  search,
  currentUserRole,
  onRoleChange,
  onSuspendToggle,
}) {
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

  return (
    <ul className="space-y-4">
      {sortedUsers.length > 0
        ? sortedUsers.map((user) => (
            <UserListItem
              key={user.id}
              user={user}
              currentUserRole={currentUserRole}
              onRoleChange={onRoleChange}
              onSuspendToggle={onSuspendToggle}
            />
          ))
        : search.length >= 3 && (
            <li className="text-gray-500">No users found</li>
          )}
    </ul>
  );
}
