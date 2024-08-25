import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useState, useMemo, useEffect } from 'react';
import { fetchTodos, deleteTodo, createTodo } from '../services/apiTodos';
import { fetchNotes } from '../services/apiNotes';
import { fetchUsers } from '../services/apiAuth';
import { useUser } from '../features/authentication/useUser';
import UploadTodoModal from '../features/Dashboard/UploadTodoModal';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import supabase from '../services/supabase';

import { toast } from 'react-hot-toast';

function Dashboard() {
  const { user } = useUser();
  const queryClient = useQueryClient();

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    async function cleanUpOverdueTodos() {
      try {
        await supabase.rpc('delete_overdue_todos');
        console.log('Overdue todos deleted');
      } catch (error) {
        console.error('Failed to delete overdue todos:', error.message);
      }
    }

    cleanUpOverdueTodos();
  }, []);

  const {
    data: users = [],
    isLoading: isUsersLoading,
    error: usersError,
  } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
  });

  const {
    data: notes = [],
    isLoading: isNotesLoading,
    error: notesError,
  } = useQuery({
    queryKey: ['notes'],
    queryFn: fetchNotes,
  });

  const {
    data: toDos = [],
    isLoading: isToDosLoading,
    error: toDosError,
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

  function handleDeleteTodo(id) {
    confirmDialog({
      message: 'Are you sure you want to delete this assignment?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => deleteMutation.mutate(id),
      reject: () => toast.error('Delete action canceled'),
    });
  }

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

  function handleCreateToDo(newToDo) {
    return createMutation.mutateAsync(newToDo);
  }

  // Prepare data
  const topUsers = users.slice(0, 100);

  const top5Users = useMemo(() => {
    return users
      .sort((a, b) => b.uploadedNotesCount - a.uploadedNotesCount)
      .slice(0, 5);
  }, [users]);

  const top5Notes = useMemo(() => {
    return notes
      .sort((a, b) => b.average_rating - a.average_rating)
      .slice(0, 5);
  }, [notes]);

  if (isUsersLoading || isNotesLoading || isToDosLoading) {
    return <div className="text-center text-gray-500">Loading...</div>;
  }

  if (usersError || notesError || toDosError) {
    return (
      <div className="text-center text-red-500">
        Error:{' '}
        {usersError?.message || notesError?.message || toDosError?.message}
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Confirmation Dialog */}
      <ConfirmDialog acceptClassName="ml-3" />

      {/* Welcome Message */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h1 className="text-3xl font-bold">
          Welcome, {user?.full_name || 'User'}
        </h1>
      </div>

      {/* Container with First 100 Users */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-6 max-h-60 overflow-y-scroll">
        <h2 className="text-xl font-semibold mb-4">First 100 Users</h2>
        <ul>
          {topUsers.map((user) => (
            <li key={user.id} className="py-2 border-b border-gray-300">
              {user.full_name} - {user.email}
            </li>
          ))}
        </ul>
      </div>

      {/* To-Do List */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold mb-4">To-Do List</h2>
          {(user.role === 'admin' || user.role === 'super_admin') && (
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-blue-500 text-white px-4 py-2 rounded"
              disabled={createMutation.isLoading}
            >
              {createMutation.isLoading ? 'Creating...' : 'Create To-Do'}
            </button>
          )}
        </div>

        <ul>
          {toDos.map((todo) => (
            <li
              key={todo.id}
              className="py-2 border-b border-gray-300 flex justify-between items-center"
            >
              <div>
                <div className="font-semibold">{todo.title}</div>
                <div className="text-gray-600">
                  Deadline: {new Date(todo.deadline).toLocaleDateString()}
                </div>
              </div>
              {(user.role === 'admin' || user.role === 'super_admin') && (
                <button
                  onClick={() => handleDeleteTodo(todo.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  Delete
                </button>
              )}
            </li>
          ))}
        </ul>
      </div>

      <UploadTodoModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateToDo}
      />

      {/* Top 5 Users Who Uploaded the Most Notes */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">
          Top 5 Users by Uploaded Notes
        </h2>
        <ul>
          {top5Users.map((user) => (
            <li key={user.id} className="py-2 border-b border-gray-300">
              {user.full_name} - {user.uploadedNotesCount}
            </li>
          ))}
        </ul>
      </div>

      {/* Top 5 Most Rated Notes */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Top 5 Most Rated Notes</h2>
        <ul>
          {top5Notes.map((note) => (
            <li key={note.id} className="py-2 border-b border-gray-300">
              <div className="font-semibold">{note.title}</div>
              <div className="text-gray-600">
                Average Rating: {note.average_rating} - {note.users.full_name}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Dashboard;
