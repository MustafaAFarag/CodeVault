import { useState, useCallback } from 'react';
import { useTodos } from '../features/Dashboard/useTodos';
import { useUsers } from '../features/authentication/useUsers';
import { useNotes } from '../features/Notes/useNotes';
import { useCleanUp } from '../hooks/useCleanup';
import UsersList from '../features/Dashboard/UsersList';
import Top5Users from '../features/Dashboard/Top5Users';
import Top5Notes from '../features/Dashboard/Top5Notes';
import ToDoList from '../features/Dashboard/ToDoList';
import UploadTodoModal from '../features/Dashboard/UploadTodoModal';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { toast } from 'react-hot-toast';
import { useUser } from '../features/authentication/useUser';
import Spinner from '../ui/Spinner';
import ErrorMessage from '../ui/ErrorMessage';
import '../styles/index.css';
import UpdateModal from '../ui/UpdateModal';

function Dashboard() {
  useCleanUp();

  const { user } = useUser();

  const {
    todos,
    isLoading: isTodosLoading,
    error: todosError,
    deleteMutation,
    createMutation,
  } = useTodos();
  const { users, isLoading: isUsersLoading, error: usersError } = useUsers();
  const { notes, isLoading: isNotesLoading, error: notesError } = useNotes();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleDeleteTodo = useCallback(
    (id) => {
      confirmDialog({
        message: 'Are you sure you want to delete this assignment?',
        header: 'Delete Confirmation',
        icon: 'pi pi-exclamation-triangle',
        acceptClassName: 'p-button-primary',
        rejectClassName: 'p-button-secondary',
        accept: () => deleteMutation.mutate(id),
        reject: () => toast.error('Delete action canceled'),
      });
    },
    [deleteMutation],
  );

  const handleCreateToDo = useCallback(
    (newToDo) => {
      return createMutation.mutateAsync(newToDo);
    },
    [createMutation],
  );

  const filteredUsers = users
    .filter((user) =>
      user.full_name.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    .slice(0, 100);

  const top5Users = users
    .sort((a, b) => b.uploadedNotesCount - a.uploadedNotesCount)
    .slice(0, 5);

  const top5Notes = notes
    .sort((a, b) => b.average_rating - a.average_rating)
    .slice(0, 5);

  if (isTodosLoading || isUsersLoading || isNotesLoading) return <Spinner />;
  if (todosError || usersError || notesError) {
    const errorMessage =
      todosError?.message || usersError?.message || notesError?.message;
    return <ErrorMessage message={`Error loading data: ${errorMessage}`} />;
  }

  return (
    <>
      <h2 className="px-4 py-2 text-3xl font-semibold">
        Welcome{' '}
        <span className="font-bold text-teal-600">{user.full_name}!</span>
      </h2>
      <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
        <UpdateModal />
        <UsersList
          users={filteredUsers}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
        <Top5Users top5Users={top5Users} user={user} />
        <Top5Notes top5Notes={top5Notes} />
        <ToDoList
          toDos={todos}
          handleDeleteTodo={handleDeleteTodo}
          setIsModalOpen={setIsModalOpen}
          createMutation={createMutation}
          user={user}
        />
        <UploadTodoModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleCreateToDo}
        />
        <ConfirmDialog />
      </div>
    </>
  );
}

export default Dashboard;
