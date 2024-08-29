const Spinner = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-75">
      <div className="rounded-lg bg-white p-5 shadow-lg">
        <div className="flex flex-col items-center">
          <div className="h-12 w-12 animate-spin rounded-full border-t-4 border-solid border-blue-500"></div>
          <p className="mt-4 text-lg font-semibold text-gray-700">Loading...</p>
        </div>
      </div>
    </div>
  );
};

export default Spinner;
