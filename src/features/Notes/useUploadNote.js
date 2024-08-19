import { useMutation, useQueryClient } from '@tanstack/react-query';
import { uploadNote } from '../../services/apiNotes';

export function useUploadNote() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: uploadNote,
    onSuccess: () => {
      queryClient.invalidateQueries(['notes']);
    },
  });

  return mutation;
}
