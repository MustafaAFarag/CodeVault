import { useQuery } from '@tanstack/react-query';
import { fetchUsers } from '../../services/apiAuth';

export function useUsers() {
  const {
    data: users = [],
    error,
    isLoading,
  } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
  });

  return { users, error, isLoading };
}
