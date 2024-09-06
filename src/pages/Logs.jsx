/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchLogs } from '../services/apiLogs';
import { Paginator } from 'primereact/paginator';
import Spinner from '../ui/Spinner';
import ErrorMessage from '../ui/ErrorMessage';

function Logs() {
  const [page, setPage] = useState(0);
  const [rows, setRows] = useState(7);

  const {
    data: logs = [],
    error,
    isLoading,
  } = useQuery({
    queryKey: ['logs'],
    queryFn: fetchLogs,
  });

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return <ErrorMessage />;
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
    <div className="bg-gray-50 p-8 lg:h-[660px]">
      <h1 className="mb-6 mt-10 text-center text-4xl font-bold text-teal-600 sm:text-5xl md:text-6xl lg:text-7xl">
        Activity Logs
      </h1>

      <div className="rounded-lg bg-white p-6 shadow-md">
        {paginatedLogs.length > 0 ? (
          <ul className="space-y-6">
            {paginatedLogs.map((log) => (
              <li
                key={log.id}
                className="flex flex-col border-b border-gray-300 pb-4"
              >
                <p className="text-lg font-semibold lg:text-2xl">
                  {log.action_type}
                </p>
                <p className="text-gray-500 lg:text-lg">
                  {new Date(log.created_at).toLocaleString()} - By:{' '}
                  {log.users.full_name}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-center text-xl font-semibold text-gray-500">
            No logs found
          </div>
        )}

        {paginatedLogs.length > 0 && (
          <Paginator
            first={page * rows}
            rows={rows}
            totalRecords={totalLogs}
            onPageChange={onPageChange}
            className="mt-6 p-2 text-xl"
            template="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink"
            leftContent={
              <span className="font-bold">
                {page + 1} of {Math.ceil(totalLogs / rows)}
              </span>
            }
          />
        )}
      </div>
    </div>
  );
}

export default Logs;
