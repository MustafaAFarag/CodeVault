import { useMutation, useQueryClient } from '@tanstack/react-query';
import { suspendUser } from '../../services/apiAuth';

export function useSuspendMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: suspendUser,
    onSuccess: (updatedUser) => {
      console.log('Suspension mutation succeeded. Updated user:', updatedUser);
      queryClient.invalidateQueries(['users']);
    },
    onError: (error) => {
      console.error('Suspend user error:', error);
    },
  });
}
