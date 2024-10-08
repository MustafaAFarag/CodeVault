import { useState } from 'react';
import { useUsers } from '../features/Admin/useUsers';
import { useRoleMutation } from '../features/Admin/useRoleMutation';
import { useSuspendMutation } from '../features/Admin/useSuspendMutation';
import { UserList } from '../features/Admin/UserList';
import { useUser } from '../features/authentication/useUser';
import Spinner from '../ui/Spinner';
import { toast } from 'react-hot-toast';
import ErrorMessage from '../ui/ErrorMessage';

function AdminPanel() {
  const { user } = useUser();
  const [search, setSearch] = useState('');

  const { users, error, isLoading } = useUsers();
  const roleMutation = useRoleMutation();
  const suspendMutation = useSuspendMutation();

  const handleRoleChange = (userId, newRole) => {
    const targetUser = users.find((u) => u.id === userId);

    if (user.role === 'super_admin') {
      roleMutation.mutate(
        { userId, newRole, adminId: user.id },
        {
          onSuccess: () => {
            toast.success(
              `User ${targetUser.full_name} promoted to ${newRole}`,
            );
          },
          onError: () => {
            toast.error(`Failed to change role for ${targetUser.full_name}`);
          },
        },
      );
    } else if (user.role === 'admin') {
      if (targetUser.role === 'admin') return;
      if (newRole === 'basic' || newRole === 'verified') {
        roleMutation.mutate(
          { userId, newRole, adminId: user.id },
          {
            onSuccess: () => {
              toast.success(
                `User ${targetUser.full_name} changed to ${newRole}`,
              );
            },
            onError: () => {
              toast.error(`Failed to change role for ${targetUser.full_name}`);
            },
          },
        );
      }
    }
  };

  const handleSuspendUser = (userId, isSuspended) => {
    const targetUser = users.find((u) => u.id === userId);

    if (user.role === 'super_admin') {
      suspendMutation.mutate(
        { userId, isSuspended, adminId: user.id },
        {
          onSuccess: () => {
            toast.success(
              `User ${targetUser.full_name} ${
                isSuspended ? 'suspended' : 'unsuspended'
              }`,
            );
          },
          onError: () => {
            toast.error(
              `Failed to ${isSuspended ? 'suspend' : 'unsuspend'} ${
                targetUser.full_name
              }`,
            );
          },
        },
      );
    } else if (user.role === 'admin') {
      if (targetUser.role !== 'admin') {
        suspendMutation.mutate(
          { userId, isSuspended, adminId: user.id },
          {
            onSuccess: () => {
              toast.success(
                `User ${targetUser.full_name} ${
                  isSuspended ? 'suspended' : 'unsuspended'
                }`,
              );
            },
            onError: () => {
              toast.error(
                `Failed to ${isSuspended ? 'suspend' : 'unsuspend'} ${
                  targetUser.full_name
                }`,
              );
            },
          },
        );
      }
    }
  };
  if (isLoading) return <Spinner />;
  if (error) return <ErrorMessage />;

  return (
    <div className="flex flex-col overflow-hidden bg-gray-50 p-4 lg:h-[700px] lg:p-8">
      <h1 className="mb-6 mt-10 text-center text-3xl font-bold text-teal-600 sm:text-4xl md:text-5xl lg:text-6xl">
        Admin Panel
      </h1>

      <div className="mb-8 flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
        <input
          type="text"
          placeholder="Search by full name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-lg border border-gray-300 p-3 text-lg md:w-1/2 lg:text-xl"
        />
      </div>

      <div className="flex-1 overflow-auto rounded-lg bg-white p-4 shadow-md md:p-6">
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
