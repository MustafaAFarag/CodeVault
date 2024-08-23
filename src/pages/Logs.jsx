import { useQuery } from '@tanstack/react-query';
import { fetchLogs } from '../services/apiLogs';

function Logs() {
  const {
    data: logs = [],
    error,
    isLoading,
  } = useQuery({
    queryKey: ['logs'],
    queryFn: fetchLogs,
  });

  if (isLoading) {
    return <div className="text-center text-gray-500">Loading logs...</div>;
  }

  if (error) {
    return (
      <div className="text-center text-red-500">Error: {error.message}</div>
    );
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">Activity Logs</h1>
      <div className="bg-white shadow-md rounded-lg p-6">
        {logs.length > 0 ? (
          <ul className="space-y-4">
            {logs.map((log) => (
              <li
                key={log.id}
                className="p-4 border-b border-gray-300 flex flex-col"
              >
                <div className="font-semibold text-lg">{log.action_type}</div>
                <div className="text-gray-600">{log.description}</div>
                <div className="text-gray-500 text-sm">
                  {new Date(log.created_at).toLocaleString()} - Done By:{' '}
                  {log.users.full_name}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-gray-500 text-center">No logs found</div>
        )}
      </div>
    </div>
  );
}

export default Logs;
