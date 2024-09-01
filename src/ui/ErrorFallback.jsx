/* eslint-disable react/prop-types */
function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <main className="flex h-screen items-center justify-center bg-teal-100 p-12">
      <div className="flex max-w-5xl flex-col items-center rounded-md border border-gray-200 bg-white p-12 text-center">
        <h1 className="mb-4 text-2xl font-bold text-text">
          Something went wrong 🧐
        </h1>
        <p className="mb-8 text-lg text-text">{error.message}</p>
        <button
          onClick={resetErrorBoundary}
          className="rounded-lg bg-blue-500 px-4 py-2 text-lg text-white transition-colors hover:bg-blue-600"
        >
          Try again
        </button>
      </div>
    </main>
  );
}

export default ErrorFallback;
