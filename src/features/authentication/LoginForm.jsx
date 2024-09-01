import { motion } from 'framer-motion';
import { useState } from 'react';
import { useLogin } from './useLogin';
import SpinnerMini from '../../ui/SpinnerMini';
import toast from 'react-hot-toast';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, isLoading } = useLogin();

  function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) return;

    login(
      { email, password },
      {
        onSuccess: () => {
          toast.success('Login Successful!');
        },
        onError: (error) => {
          toast.error(`Login failed: ${error.message}`);
        },
        onSettled: () => {
          setEmail('');
          setPassword('');
        },
      },
    );
  }

  return (
    <motion.form
      className="h-full rounded-lg bg-gray-50 p-6 shadow-md"
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mb-6 flex flex-col gap-4">
        <label htmlFor="email" className="text-2xl font-semibold text-gray-700">
          Email Address
        </label>
        <input
          className="rounded-md border border-gray-300 px-4 py-3 text-xl text-gray-800 placeholder-gray-500 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          type="email"
          id="email"
          autoComplete="username"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading}
        />
      </div>

      <div className="mb-6 flex flex-col gap-4">
        <label
          htmlFor="password"
          className="text-2xl font-semibold text-gray-700"
        >
          Password
        </label>
        <input
          className="rounded-md border border-gray-300 px-4 py-3 text-xl text-gray-800 placeholder-gray-500 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          type="password"
          id="password"
          autoComplete="current-password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLoading}
        />
      </div>

      <motion.button
        className="w-full rounded-md bg-blue-600 py-3 text-lg font-semibold text-white transition-all duration-300 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
        type="submit"
        disabled={isLoading}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        {isLoading ? <SpinnerMini /> : 'Log in'}
      </motion.button>
    </motion.form>
  );
}

export default LoginForm;
