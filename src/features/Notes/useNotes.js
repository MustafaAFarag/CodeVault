import { useQuery } from '@tanstack/react-query';
import { fetchNotes } from '../../services/apiNotes';

export const useNotes = () => {
  const {
    data: notes = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ['notes'],
    queryFn: fetchNotes,
  });

  return { notes, isLoading, error };
};
