import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateUserRole } from '../../services/apiAuth';

export function useRoleMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateUserRole,
    onSuccess: () => {
      queryClient.invalidateQueries(['users']);
    },
    onError: (error) => {
      console.error('Role update error:', error.message);
    },
  });
}
