import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import SpinnerMini from '../../ui/SpinnerMini';
import { useSignup } from './useSignup';

function SignupForm() {
  const { signup, isLoading } = useSignup();
  const { register, formState, getValues, handleSubmit } = useForm();
  const { errors } = formState;

  function onSubmit({ fullName, email, password }) {
    signup({ fullName, email, password });
  }

  return (
    <motion.form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-gray-50 p-6 rounded-lg shadow-md"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Full Name */}
        <motion.div
          className="flex flex-col gap-4"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <label
            htmlFor="fullName"
            className="text-2xl font-semibold text-gray-700"
          >
            Full Name
          </label>
          <input
            className="border border-gray-300 rounded-md py-3 px-4 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300 text-xl"
            type="text"
            id="fullName"
            placeholder="Enter your full name"
            {...register('fullName', { required: 'This field is required' })}
            disabled={isLoading}
          />
          {errors.fullName && (
            <span className="text-red-500 text-sm">
              {errors.fullName.message}
            </span>
          )}
        </motion.div>

        {/* Email Address */}
        <motion.div
          className="flex flex-col gap-4"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <label
            htmlFor="email"
            className="text-2xl font-semibold text-gray-700"
          >
            Email Address
          </label>
          <input
            className="border border-gray-300 rounded-md py-3 px-4 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300 text-xl"
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
            <span className="text-red-500 text-sm">{errors.email.message}</span>
          )}
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {/* Password */}
        <motion.div
          className="flex flex-col gap-4"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <label
            htmlFor="password"
            className="text-2xl font-semibold text-gray-700"
          >
            Password (min 8 characters)
          </label>
          <input
            className="border border-gray-300 rounded-md py-3 px-4 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300 text-xl"
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
            <span className="text-red-500 text-sm">
              {errors.password.message}
            </span>
          )}
        </motion.div>

        {/* Confirm Password */}
        <motion.div
          className="flex flex-col gap-4"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <label
            htmlFor="passwordConfirm"
            className="text-2xl font-semibold text-gray-700"
          >
            Confirm Password
          </label>
          <input
            className="border border-gray-300 rounded-md py-3 px-4 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300 text-xl"
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
            <span className="text-red-500 text-sm">
              {errors.passwordConfirm.message}
            </span>
          )}
        </motion.div>
      </div>

      {/* Submit Button */}
      <motion.button
        className="w-full py-3 mt-6 text-lg font-semibold bg-blue-600 text-white rounded-md hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
        type="submit"
        disabled={isLoading}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.4 }}
      >
        {isLoading ? <SpinnerMini /> : 'Sign Up'}
      </motion.button>
    </motion.form>
  );
}

export default SignupForm;
