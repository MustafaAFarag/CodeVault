import { useQuery } from '@tanstack/react-query';
import { fetchAllUsers } from '../services/apiAuth';
function AdminPanel() {
  const {
    data: users,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['users'],
    queryFn: fetchAllUsers,
  });
  console.log(users);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>Admin Panel</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.full_name} - {user.role} - {user.created_at}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminPanel;
