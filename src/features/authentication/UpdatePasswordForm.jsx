// UpdatePasswordForm.js
import { useForm } from 'react-hook-form';
import { useUpdateUser } from './useUpdateUser';

function UpdatePasswordForm() {
  const { register, handleSubmit, formState, getValues, reset } = useForm();
  const { errors } = formState;

  const { updateUser, isUpdating } = useUpdateUser();

  function onSubmit({ password }) {
    updateUser({ password }, { onSuccess: reset() });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Password Row */}
      <div className="flex flex-col space-y-2 border-b border-gray-300 py-2">
        <label htmlFor="password" className="text-lg font-semibold md:text-xl">
          New Password (min 8 chars)
        </label>
        <input
          id="password"
          type="password"
          autoComplete="current-password"
          disabled={isUpdating}
          {...register('password', {
            required: 'This field is required',
            minLength: {
              value: 8,
              message: 'Password needs a minimum of 8 characters',
            },
          })}
          className="rounded-lg border border-gray-300 p-2 text-base md:text-lg"
        />
        {errors.password && (
          <span className="text-base text-red-700">
            {errors.password.message}
          </span>
        )}
      </div>

      {/* Confirm Password Row */}
      <div className="flex flex-col space-y-2 border-b border-gray-300 py-2">
        <label
          htmlFor="passwordConfirm"
          className="text-lg font-semibold md:text-xl"
        >
          Confirm Password
        </label>
        <input
          type="password"
          autoComplete="new-password"
          id="passwordConfirm"
          disabled={isUpdating}
          {...register('passwordConfirm', {
            required: 'This field is required',
            validate: (value) =>
              getValues('password') === value || 'Passwords need to match',
          })}
          className="w-full rounded-lg border border-gray-300 p-2 text-base md:text-lg lg:w-auto"
        />
        {errors.passwordConfirm && (
          <span className="text-base text-red-700">
            {errors.passwordConfirm.message}
          </span>
        )}
      </div>

      {/* Submit Button Row */}
      <div className="flex justify-end gap-4 pt-4">
        <button
          type="reset"
          onClick={() => reset()}
          disabled={isUpdating}
          className="transform rounded-lg bg-gray-200 px-4 py-2 text-base transition-transform hover:scale-105 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 md:text-lg lg:text-xl"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isUpdating}
          className={`w-full transform rounded-lg bg-teal-600 px-4 py-2 text-base text-white transition-transform hover:scale-105 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 lg:w-auto lg:text-xl ${isUpdating ? 'cursor-not-allowed bg-gray-100' : 'cursor-pointer bg-teal-600'}`}
        >
          Update Password
        </button>
      </div>
    </form>
  );
}

export default UpdatePasswordForm;
