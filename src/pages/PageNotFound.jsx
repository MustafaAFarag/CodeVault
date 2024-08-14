import { useNavigate } from 'react-router-dom';

function PageNotFound() {
  const navigate = useNavigate();

  return (
    <main className="h-screen flex items-center justify-center bg-gray-900">
      <div className="text-center text-white">
        <h1 className="text-2xl mb-4">
          The page you are looking for could not be found 😢
        </h1>
        <button
          onClick={() => navigate('/dashboard')}
          className="rounded-md bg-blue-600 p-2 m-4 hover:bg-blue-700 transition-colors duration-300"
        >
          &larr; Go back
        </button>
      </div>
    </main>
  );
}

export default PageNotFound;
