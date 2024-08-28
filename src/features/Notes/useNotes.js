import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchNotes, deleteNote } from '../../services/apiNotes';
import { toast } from 'react-hot-toast';

export const useNotes = () => {
  const queryClient = useQueryClient();

  const {
    data: notes = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ['notes'],
    queryFn: fetchNotes,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries(['notes']);
      toast.success('Note deleted successfully');
    },
    onError: (error) => {
      toast.error(`Failed to delete Note: ${error.message}`);
    },
  });
  return { notes, isLoading, error, deleteMutation };
};
