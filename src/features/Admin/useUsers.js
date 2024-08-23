import { useQuery } from '@tanstack/react-query';
import { fetchAllUsers } from '../../services/apiAuth';

export function useUsers() {
  const {
    data: users = [],
    error,
    isLoading,
  } = useQuery({
    queryKey: ['users'],
    queryFn: fetchAllUsers,
  });

  return { users, error, isLoading };
}
