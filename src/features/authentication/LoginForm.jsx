/* eslint-disable no-unused-vars */
import { useState } from 'react';
import '../../styles/index.css'; // Import your CSS file

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    // Add login logic here
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <form
        className="bg-gray-800 border border-gray-700 rounded-md p-6 max-w-sm w-full fade-in-up"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col gap-4 mb-6">
          <label htmlFor="email" className="text-lg font-semibold text-white">
            Email Address
          </label>
          <input
            className="bg-gray-700 border border-gray-600 rounded-md py-2 px-4 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
            type="email"
            id="email"
            autoComplete="username"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-4 mb-6">
          <label
            htmlFor="password"
            className="text-lg font-semibold text-white"
          >
            Password
          </label>
          <input
            className="bg-gray-700 border border-gray-600 rounded-md py-2 px-4 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
            type="password"
            id="password"
            autoComplete="current-password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          className="w-full py-3 text-lg font-semibold bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="submit"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default LoginForm;
