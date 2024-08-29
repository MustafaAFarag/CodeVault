/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchLogs } from '../services/apiLogs';
import { Paginator } from 'primereact/paginator';

function Logs() {
  const [page, setPage] = useState(0); // Current page state
  const [rows, setRows] = useState(7); // Number of rows per page

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

  // Calculate total pages
  const totalLogs = logs.length;

  // Handle page change
  const onPageChange = (event) => {
    setPage(event.first / rows);
  };

  // Get logs for the current page
  const paginatedLogs = logs.slice(page * rows, (page + 1) * rows);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="mb-6 text-center text-3xl font-bold">Activity Logs</h1>
      <div className="rounded-lg bg-white p-6 shadow-md">
        {paginatedLogs.length > 0 ? (
          <ul className="space-y-4">
            {paginatedLogs.map((log) => (
              <li
                key={log.id}
                className="flex flex-col border-b border-gray-300 p-4"
              >
                <div className="text-lg font-semibold">{log.action_type}</div>
                <div className="text-gray-600">{log.description}</div>
                <div className="text-sm text-gray-500">
                  {new Date(log.created_at).toLocaleString()} - Done By:{' '}
                  {log.users.full_name}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-center text-gray-500">No logs found</div>
        )}
        <Paginator
          first={page * rows}
          rows={rows}
          totalRecords={totalLogs}
          onPageChange={onPageChange}
        />
      </div>
    </div>
  );
}

export default Logs;
