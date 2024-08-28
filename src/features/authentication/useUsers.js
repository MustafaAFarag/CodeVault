import { useQuery } from '@tanstack/react-query';
import { fetchUsers } from '../../services/apiAuth';

export const useUsers = () => {
  const {
    data: users = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
  });

  return { users, isLoading, error };
};
