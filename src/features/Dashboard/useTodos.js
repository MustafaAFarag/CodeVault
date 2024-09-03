import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchTodos, deleteTodo, createTodo } from '../../services/apiTodos';
import { toast } from 'react-hot-toast';

export const useTodos = () => {
  const queryClient = useQueryClient();

  const {
    data: todos = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ['todos'],
    queryFn: fetchTodos,
    refetchInterval: 60000,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteTodo,
    onSuccess: () => {
      queryClient.invalidateQueries(['todos']);
      toast.success('To-Do deleted successfully');
    },
    onError: () => {
      toast.error('Failed to delete To-Do');
    },
  });

  const createMutation = useMutation({
    mutationFn: createTodo,
    onSuccess: () => {
      queryClient.invalidateQueries(['todos']);
      toast.success('To-Do created successfully');
    },
    onError: () => {
      toast.error('Failed to create To-Do');
    },
  });

  return { todos, isLoading, error, deleteMutation, createMutation };
};
