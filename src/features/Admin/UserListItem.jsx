/* eslint-disable react/prop-types */

export function UserListItem({
  user,
  currentUserRole,
  onRoleChange,
  onSuspendToggle,
}) {
  const isAdmin = user.role === 'admin';
  const canChangeRole =
    user.role !== 'super_admin' &&
    (currentUserRole === 'super_admin' || !isAdmin);
  const canSuspend =
    user.role !== 'super_admin' &&
    (currentUserRole === 'super_admin' || !isAdmin);

  // Updated getAvailableRoles to use the currentRole passed as a prop
  const getAvailableRoles = (currentRole) => {
    if (currentRole === 'super_admin') {
      return ['basic', 'verified', 'admin'];
    }
    if (currentRole === 'admin') {
      return ['basic', 'verified'];
    }
    return [];
  };

  return (
    <li className="flex items-center justify-between p-4 border-b border-gray-300">
      <div className="flex-1">
        <div className="font-semibold text-lg">{user.full_name}</div>
        <div className="text-gray-600">
          {user.role} - {user.email}
        </div>
        <div className="text-gray-500 text-sm">
          Created: {new Date(user.created_at).toLocaleDateString()}
        </div>
        {user.suspended && (
          <div className="text-red-500 text-sm">Suspended</div>
        )}
      </div>
      <div className="space-x-4">
        <select
          value={user.role}
          onChange={(e) => onRoleChange(user.id, e.target.value)}
          className={`border border-gray-300 rounded px-2 py-1 bg-white ${!canChangeRole ? 'cursor-not-allowed opacity-50' : ''}`}
          disabled={!canChangeRole}
        >
          {getAvailableRoles(currentUserRole).map((role) => (
            <option key={role} value={role}>
              {role.charAt(0).toUpperCase() + role.slice(1)}
            </option>
          ))}
        </select>
        <button
          onClick={() => onSuspendToggle(user.id, !user.suspended)}
          className={`border px-2 py-1 rounded ${user.suspended ? 'bg-red-500 text-white ' : 'bg-green-500 text-white'} ${!canSuspend ? 'cursor-not-allowed opacity-50' : ''}`}
          disabled={!canSuspend}
        >
          {user.suspended ? 'Unsuspend' : 'Suspend'}
        </button>
      </div>
    </li>
  );
}
