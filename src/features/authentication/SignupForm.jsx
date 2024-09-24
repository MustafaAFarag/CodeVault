import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import SpinnerMini from '../../ui/SpinnerMini';
import { useSignup } from './useSignup';
import Confetti from 'react-confetti'; // Import react-confetti
import { useEffect, useState } from 'react';

function SignupForm() {
  const { signup, isLoading, isSuccess } = useSignup();
  const { register, formState, getValues, handleSubmit } = useForm();
  const { errors } = formState;
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (isSuccess) {
      setShowConfetti(true);
      const timer = setTimeout(() => setShowConfetti(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [isSuccess]);

  function onSubmit({ fullName, email, password }) {
    signup({ fullName, email, password });
  }

  return (
    <>
      {showConfetti && <Confetti />}

      <motion.form
        onSubmit={handleSubmit(onSubmit)}
        className="rounded-lg bg-gray-50 p-6 shadow-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Full Name */}
          <motion.div
            className="flex flex-col gap-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <label
              htmlFor="fullName"
              className="text-2xl font-semibold text-gray-700"
            >
              Full Name
            </label>
            <input
              className="rounded-md border border-gray-300 px-4 py-3 text-xl text-gray-800 placeholder-gray-500 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              type="text"
              id="fullName"
              placeholder="Enter your full name"
              {...register('fullName', {
                required: 'This field is required',
                pattern: {
                  value: /^[A-Za-z\s]{3,}$/,
                  message: 'Only letters (3+ characters) are allowed',
                },
              })}
              disabled={isLoading}
            />
            {errors.fullName && (
              <span className="text-sm text-red-500">
                {errors.fullName.message}
              </span>
            )}
          </motion.div>

          {/* Email Address */}
          <motion.div
            className="flex flex-col gap-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <label
              htmlFor="email"
              className="text-2xl font-semibold text-gray-700"
            >
              Email Address
            </label>
            <input
              className="rounded-md border border-gray-300 px-4 py-3 text-xl text-gray-800 placeholder-gray-500 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              type="email"
              id="email"
              placeholder="Enter your email"
              {...register('email', {
                required: 'This field is required',
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: 'Please provide a valid email address',
                },
              })}
              disabled={isLoading}
            />
            {errors.email && (
              <span className="text-sm text-red-500">
                {errors.email.message}
              </span>
            )}
          </motion.div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Password */}
          <motion.div
            className="flex flex-col gap-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <label
              htmlFor="password"
              className="text-2xl font-semibold text-gray-700"
            >
              Password (min 8 characters)
            </label>
            <input
              className="rounded-md border border-gray-300 px-4 py-3 text-xl text-gray-800 placeholder-gray-500 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              type="password"
              id="password"
              placeholder="Enter your password"
              {...register('password', {
                required: 'This field is required',
                minLength: {
                  value: 8,
                  message: 'Password needs a minimum of 8 characters',
                },
              })}
              disabled={isLoading}
            />
            {errors.password && (
              <span className="text-sm text-red-500">
                {errors.password.message}
              </span>
            )}
          </motion.div>

          {/* Confirm Password */}
          <motion.div
            className="flex flex-col gap-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <label
              htmlFor="passwordConfirm"
              className="text-2xl font-semibold text-gray-700"
            >
              Confirm Password
            </label>
            <input
              className="rounded-md border border-gray-300 px-4 py-3 text-xl text-gray-800 placeholder-gray-500 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              type="password"
              id="passwordConfirm"
              placeholder="Confirm your password"
              {...register('passwordConfirm', {
                required: 'This field is required',
                validate: (value) =>
                  value === getValues().password || 'Passwords need to match',
              })}
              disabled={isLoading}
            />
            {errors.passwordConfirm && (
              <span className="text-sm text-red-500">
                {errors.passwordConfirm.message}
              </span>
            )}
          </motion.div>
        </div>

        {/* Submit Button */}
        <motion.button
          className="mt-6 w-full rounded-md bg-blue-600 py-3 text-lg font-semibold text-white transition-all duration-300 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
          type="submit"
          disabled={isLoading}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
        >
          {isLoading ? <SpinnerMini /> : 'Sign Up'}
        </motion.button>
      </motion.form>
    </>
  );
}

export default SignupForm;
