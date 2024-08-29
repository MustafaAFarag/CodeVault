import { useNavigate } from 'react-router-dom';

function PageNotFound() {
  const navigate = useNavigate();

  return (
    <main className="flex h-screen items-center justify-center bg-gray-900">
      <div className="text-center text-white">
        <h1 className="mb-4 text-2xl">
          The page you are looking for could not be found 😢
        </h1>
        <button
          onClick={() => navigate(-1)}
          className="m-4 rounded-md bg-blue-600 p-2 transition-colors duration-300 hover:bg-blue-700"
        >
          &larr; Go back
        </button>
      </div>
    </main>
  );
}

export default PageNotFound;
