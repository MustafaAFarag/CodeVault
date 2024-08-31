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
    <li className="flex flex-col gap-4 border-b border-gray-300 p-4 md:flex-row md:items-center md:gap-6">
      <div className="flex-1">
        <div className="text-lg font-semibold lg:text-xl">{user.full_name}</div>
        <div className="text-gray-600 lg:text-lg">
          {user.role} - {user.email}
        </div>
        <div className="text-sm text-gray-500 lg:text-base">
          Created: {new Date(user.created_at).toLocaleDateString()}
        </div>
        {user.suspended && (
          <div className="text-sm text-red-500 lg:text-base">Suspended</div>
        )}
      </div>
      <div className="flex flex-col space-y-2 md:flex-row md:space-x-4 md:space-y-0">
        <select
          value={user.role}
          onChange={(e) => onRoleChange(user.id, e.target.value)}
          className={`rounded border border-gray-300 bg-white px-2 py-1 text-sm lg:text-base ${!canChangeRole ? 'cursor-not-allowed opacity-50' : ''}`}
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
          className={`rounded border px-2 py-1 text-sm lg:text-base ${user.suspended ? 'bg-red-500 text-white' : 'bg-green-500 text-white'} ${!canSuspend ? 'cursor-not-allowed opacity-50' : ''}`}
          disabled={!canSuspend}
        >
          {user.suspended ? 'Unsuspend' : 'Suspend'}
        </button>
      </div>
    </li>
  );
}
