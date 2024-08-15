/* eslint-disable no-unused-vars */
import { useState } from 'react';
import '../../styles/index.css'; // Import your CSS file
import { useLogin } from './useLogin';
import SpinnerMini from '../../ui/SpinnerMini';

function LoginForm() {
  const [email, setEmail] = useState('tefa@example.com');
  const [password, setPassword] = useState('mypassword');
  const { login, isLoading } = useLogin();

  function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) return;
    login(
      { email, password },
      {
        onSettled: () => {
          setEmail('');
          setPassword('');
        },
      },
    );
  }

  return (
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
          disabled={isLoading}
        />
      </div>

      <div className="flex flex-col gap-4 mb-6">
        <label htmlFor="password" className="text-lg font-semibold text-white">
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
          disabled={isLoading}
        />
      </div>

      <button
        className="w-full py-3 text-lg font-semibold bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        type="submit"
        disabled={isLoading}
      >
        {isLoading ? <SpinnerMini /> : 'Log in'}
      </button>
    </form>
  );
}

export default LoginForm;
