import { useState } from 'react';
import { useUsers } from '../features/Admin/useUsers';
import { useRoleMutation } from '../features/Admin/useRoleMutation';
import { useSuspendMutation } from '../features/Admin/useSuspendMutation';
import { UserList } from '../features/Admin/UserList';
import { useUser } from '../features/authentication/useUser';

function AdminPanel() {
  const { user } = useUser();
  const [search, setSearch] = useState('');

  const { users, error, isLoading } = useUsers();
  const roleMutation = useRoleMutation();
  const suspendMutation = useSuspendMutation();

  const handleRoleChange = (userId, newRole) => {
    const targetUser = users.find((u) => u.id === userId);
    if (user.role === 'super_admin') {
      roleMutation.mutate({ userId, newRole, adminId: user.id });
    } else if (user.role === 'admin') {
      if (targetUser.role === 'admin') return;
      if (newRole === 'basic' || newRole === 'verified') {
        roleMutation.mutate({ userId, newRole, adminId: user.id });
      }
    }
  };

  const handleSuspendUser = (userId, isSuspended) => {
    const targetUser = users.find((u) => u.id === userId);
    if (user.role === 'super_admin') {
      suspendMutation.mutate({ userId, isSuspended, adminId: user.id });
    } else if (user.role === 'admin') {
      if (targetUser.role !== 'admin') {
        suspendMutation.mutate({ userId, isSuspended, adminId: user.id });
      }
    }
  };

  if (isLoading)
    return <div className="text-center text-gray-500">Loading...</div>;
  if (error)
    return (
      <div className="text-center text-red-500">Error: {error.message}</div>
    );

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="mb-6 text-center text-3xl font-bold">Admin Panel</h1>
      <div className="mb-4 rounded-lg bg-white p-6 shadow-md">
        <input
          type="text"
          placeholder="Search by full name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="mb-4 w-full rounded border border-gray-300 px-4 py-2"
        />
        <UserList
          users={users}
          search={search}
          currentUserRole={user.role}
          onRoleChange={handleRoleChange}
          onSuspendToggle={handleSuspendUser}
        />
      </div>
    </div>
  );
}

export default AdminPanel;
