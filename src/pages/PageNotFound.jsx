import { useMoveBack } from '../hooks/useMoveBack';

function PageNotFound() {
  const moveBack = useMoveBack();

  return (
    <main className="h-screen flex items-center justify-center bg-slate-300 ">
      <div className="text-center">
        <h1>The page you are looking for could not be found 😢</h1>
        <button onClick={moveBack} className="rounded-md bg-blue-400 p-2 m-4">
          &larr; Go back
        </button>
      </div>
    </main>
  );
}

export default PageNotFound;
