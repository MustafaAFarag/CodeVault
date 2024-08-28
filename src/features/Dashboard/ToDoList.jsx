/* eslint-disable react/prop-types */

const ToDoList = ({
  toDos,
  handleDeleteTodo,
  setIsModalOpen,
  createMutation,
  user,
}) => (
  <div className="bg-white shadow-md rounded-lg p-6 max-h-[300px] overflow-y-auto row-start-1 col-start-2 col-span-2">
    <div className="flex justify-between text-center">
      <h2 className="text-3xl font-semibold mb-4">To-Do List</h2>
      {(user.role === 'admin' || user.role === 'super_admin') && (
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-secondary text-text px-6 py-3 rounded hover:bg-accent transition-all  shadow-lg font-semibold text-lg duration-300 mb-2"
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
      <ul>
        {toDos.map((todo) => (
          <li
            key={todo.id}
            className="py-2 border-b border-gray-300 flex justify-between items-center"
          >
            <div>
              <div className="font-semibold text-lg">{todo.title}</div>
              <div className="text-gray-600 text-lg">
                Deadline: {new Date(todo.deadline).toLocaleDateString()}
              </div>
            </div>
            {(user.role === 'admin' || user.role === 'super_admin') && (
              <button
                onClick={() => handleDeleteTodo(todo.id)}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-all duration-300"
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
