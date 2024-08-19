import { useMutation, useQueryClient } from '@tanstack/react-query';
import { rateNote } from '../../services/apiNotes';

export function useRateNote() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ noteId, ratingValue, userId }) =>
      rateNote(noteId, ratingValue, userId),
    onSuccess: () => {
      queryClient.invalidateQueries(['notes']);
    },
    onError: (error) => {
      console.error(error.message); // Log the error or show it to the user
    },
  });
}
