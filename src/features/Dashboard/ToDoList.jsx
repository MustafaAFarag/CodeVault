/* eslint-disable react/prop-types */

const ToDoList = ({
  toDos,
  handleDeleteTodo,
  setIsModalOpen,
  createMutation,
  user,
}) => (
  <div className="] row-start-3 overflow-y-auto rounded-lg bg-white p-6 shadow-md md:col-span-2 xl:col-span-2 xl:col-start-2 xl:row-start-1">
    <div className="mb-4 items-center justify-between lg:flex">
      <h2 className="text-3xl font-semibold">To-Do List</h2>
      {(user.role === 'admin' || user.role === 'super_admin') && (
        <button
          onClick={() => setIsModalOpen(true)}
          className="rounded bg-secondary px-4 py-2 text-lg font-semibold text-text shadow-lg transition-all duration-300 hover:bg-accent"
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
      <ul className="max-h-[280px] space-y-4">
        {toDos.map((todo) => (
          <li
            key={todo.id}
            className="flex items-center justify-between border-b border-gray-300 py-4"
          >
            <div className="flex-1">
              <div className="items-center gap-4 lg:flex">
                <p className="text-xl font-semibold">{todo.title}</p>
                <p className="text-lg text-gray-600">
                  Deadline: {new Date(todo.deadline).toLocaleDateString()}
                </p>
                <p className="text-lg text-gray-500">{todo.subjects.name}</p>
              </div>
            </div>
            {(user.role === 'admin' || user.role === 'super_admin') && (
              <button
                onClick={() => handleDeleteTodo(todo.id)}
                className="rounded bg-red-500 px-4 py-2 text-xl text-white transition-all duration-300 hover:bg-red-600"
              >
                Delete
              </button>
            )}
          </li>
        ))}
      </ul>
    )}
  </div>
);

export default ToDoList;
