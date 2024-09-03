/* eslint-disable react/prop-types */
const ToDoList = ({
  toDos,
  handleDeleteTodo,
  setIsModalOpen,
  createMutation,
  user,
}) => (
  <div className="custom-scrollbar row-start-3 overflow-y-auto rounded-lg bg-white p-6 shadow-md md:col-span-2 lg:h-[300px] xl:col-span-2 xl:col-start-2 xl:row-start-1 2xl:h-[350px]">
    <div className="mb-4 flex items-center justify-between">
      <h2 className="text-3xl font-semibold text-teal-600">To-Do List</h2>
      {(user.role === 'admin' || user.role === 'super_admin') && (
        <button
          onClick={() => setIsModalOpen(true)}
          className="rounded bg-teal-500 px-4 py-2 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:bg-teal-600 lg:text-xl"
          disabled={createMutation.isLoading}
        >
          Create To-Do
        </button>
      )}
    </div>

    {toDos.length === 0 ? (
      <div className="text-center text-gray-500">
        No assignments are due. Enjoy your day!
      </div>
    ) : (
      <ul className="space-y-2">
        {toDos.map((todo) => (
          <li
            key={todo.id}
            className="flex flex-col justify-between rounded-lg border border-gray-200 bg-gray-50 p-4 shadow-sm transition-shadow duration-200 hover:shadow-md"
          >
            <div className="flex-1">
              <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-xl font-semibold text-gray-800">
                    {todo.title}
                  </p>
                  <p className="mt-1 text-sm text-gray-500 lg:text-lg">
                    Deadline: {new Date(todo.deadline).toLocaleDateString()}
                  </p>
                </div>
                <p className="text-sm text-gray-400 lg:text-lg">
                  {todo.subjects.name}
                </p>
              </div>
              {todo.description && (
                <p className="mt-3 text-sm text-gray-600 lg:text-lg">
                  {todo.description}
                </p>
              )}
            </div>

            {(user.role === 'admin' || user.role === 'super_admin') && (
              <div className="mt-4 flex justify-end">
                <button
                  onClick={() => handleDeleteTodo(todo.id)}
                  className="rounded bg-red-500 px-3 py-1.5 text-sm text-white transition-all duration-300 hover:bg-red-600 lg:text-xl"
                >
                  Delete
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
    )}
  </div>
);

export default ToDoList;
