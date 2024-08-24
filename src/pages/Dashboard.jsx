import { useQuery } from '@tanstack/react-query';
import { fetchTodos } from '../services/apiTodos';
import { fetchNotes } from '../services/apiNotes';
import { fetchUsers } from '../services/apiAuth';
import { useUser } from '../features/authentication/useUser';

function Dashboard() {
  const { user } = useUser();

  const {
    data: users = [],
    isLoading: isUsersLoading,
    error: usersError,
  } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
  });

  console.log('USERSSS', users);

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
  });

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

  // Prepare data
  const topUsers = users.slice(0, 100);

  const top5Users = users
    .sort((a, b) => b.uploadedNotesCount - a.uploadedNotesCount)
    .slice(0, 5);

  const top5Notes = notes
    .sort((a, b) => b.average_rating - a.average_rating)
    .slice(0, 5);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
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
        <h2 className="text-xl font-semibold mb-4">To-Do List</h2>
        <ul>
          {toDos.map((todo) => (
            <li key={todo.id} className="py-2 border-b border-gray-300">
              <div className="font-semibold">{todo.title}</div>
              <div className="text-gray-600">
                Deadline: {new Date(todo.deadline).toLocaleDateString()}
              </div>
            </li>
          ))}
        </ul>
      </div>

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
