import { useState, useCallback } from 'react';
import { useTodos } from '../features/Todo/useTodos';
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
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
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

  if (isTodosLoading || isUsersLoading || isNotesLoading)
    return <div>Loading...</div>;
  if (todosError || usersError || notesError)
    return <div>Error loading data</div>;

  return (
    <div className="grid grid-cols-1 gap-6 p-6 md:grid-cols-2 lg:grid-cols-3">
      <UsersList
        users={filteredUsers}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
      <Top5Users top5Users={top5Users} />
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
  );
}

export default Dashboard;
