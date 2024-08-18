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
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-gray-800 border border-gray-700 rounded-md p-6 max-w-md w-full mx-auto fade-in-up"
    >
      {/* Full Name */}
      <div className="flex flex-col gap-3 mb-4">
        <label
          htmlFor="fullName"
          className="text-base font-semibold text-white"
        >
          Full Name
        </label>
        <input
          className="bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
          type="text"
          id="fullName"
          placeholder="Enter your full name"
          {...register('fullName', { required: 'This field is required' })}
          disabled={isLoading}
        />
        {errors.fullName && (
          <span className="text-red-500 text-xs">
            {errors.fullName.message}
          </span>
        )}
      </div>

      {/* Email Address */}
      <div className="flex flex-col gap-3 mb-4">
        <label htmlFor="email" className="text-base font-semibold text-white">
          Email Address
        </label>
        <input
          className="bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
          type="email"
          id="email"
          placeholder="Enter your email"
          disabled={isLoading}
          {...register('email', {
            required: 'This field is required',
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: 'Please provide a valid email address',
            },
          })}
        />
        {errors.email && (
          <span className="text-red-500 text-xs">{errors.email.message}</span>
        )}
      </div>

      {/* Password */}
      <div className="flex flex-col gap-3 mb-4">
        <label
          htmlFor="password"
          className="text-base font-semibold text-white"
        >
          Password (min 8 characters)
        </label>
        <input
          className="bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
          type="password"
          id="password"
          placeholder="Enter your password"
          disabled={isLoading}
          {...register('password', {
            required: 'This field is required',
            minLength: {
              value: 8,
              message: 'Password needs a minimum of 8 characters',
            },
          })}
        />
        {errors.password && (
          <span className="text-red-500 text-xs">
            {errors.password.message}
          </span>
        )}
      </div>

      {/* Confirm Password */}
      <div className="flex flex-col gap-3 mb-4">
        <label
          htmlFor="passwordConfirm"
          className="text-base font-semibold text-white"
        >
          Confirm Password
        </label>
        <input
          className="bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
          type="password"
          id="passwordConfirm"
          placeholder="Confirm your password"
          disabled={isLoading}
          {...register('passwordConfirm', {
            required: 'This field is required',
            validate: (value) =>
              value === getValues().password || 'Passwords need to match',
          })}
        />
        {errors.passwordConfirm && (
          <span className="text-red-500 text-xs">
            {errors.passwordConfirm.message}
          </span>
        )}
      </div>

      {/* Submit Button */}
      <button
        className="w-full py-3 text-base font-semibold bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        type="submit"
        disabled={isLoading}
      >
        {isLoading ? <SpinnerMini /> : 'Sign Up'}
      </button>
    </form>
  );
}

export default SignupForm;
