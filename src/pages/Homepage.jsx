import { Link } from 'react-router-dom';

function Homepage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">Welcome to NoteVault!</h1>
        <p className="text-lg">
          Your go-to place for sharing and discovering study materials.
        </p>
      </header>
      <section className="max-w-2xl w-full bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Featured Sections</h2>
        <ul className="list-disc pl-5 mb-6">
          <li className="mb-2">Explore Lectures</li>
          <li className="mb-2">Access Notes</li>
          <li className="mb-2">Participate in Quizzes</li>
          <li>Manage Your Profile</li>
        </ul>
        <div className="flex flex-col gap-4">
          <Link
            to="/login"
            className="inline-block px-6 py-3 text-lg font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
          >
            Log In
          </Link>
          <Link
            to="/dashboard"
            className="inline-block px-6 py-3 text-lg font-semibold text-white bg-green-600 rounded-md hover:bg-green-700 transition-colors"
          >
            Check it out
          </Link>
        </div>
      </section>
      <footer className="text-center mt-8">
        <p className="text-sm">&copy; 2024 NoteVault. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Homepage;
