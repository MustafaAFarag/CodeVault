// UpdatePasswordForm.js
import { useForm } from 'react-hook-form';
import { useUpdateUser } from './useUpdateUser';

function UpdatePasswordForm() {
  const { register, handleSubmit, formState, getValues, reset } = useForm();
  const { errors } = formState;

  const { updateUser, isUpdating } = useUpdateUser();

  function onSubmit({ password }) {
    updateUser({ password }, { onSuccess: reset });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Password Row */}
      <div className="grid grid-cols-[24rem_1fr_1.2fr] items-center gap-6 border-b border-gray-300 py-4">
        <label htmlFor="password" className="font-semibold lg:text-xl">
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
          className="rounded-lg border border-gray-300 p-2 lg:text-xl"
        />
        {errors.password && (
          <span className="text-base text-red-700">
            {errors.password.message}
          </span>
        )}
      </div>

      {/* Confirm Password Row */}
      <div className="grid grid-cols-[24rem_1fr_1.2fr] items-center gap-6 border-b border-gray-300 py-4">
        <label htmlFor="passwordConfirm" className="font-semibold lg:text-xl">
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
          className="rounded-lg border border-gray-300 p-2 lg:text-xl"
        />
        {errors.passwordConfirm && (
          <span className="text-base text-red-700">
            {errors.passwordConfirm.message}
          </span>
        )}
      </div>

      {/* Submit Button Row */}
      <div className="flex justify-end gap-4 py-4">
        <button
          type="reset"
          onClick={() => reset()}
          disabled={isUpdating}
          className="transform rounded-lg bg-gray-200 px-4 py-2 transition-transform hover:scale-105 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 lg:text-xl"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isUpdating}
          className="transform rounded-lg bg-teal-600 px-4 py-2 text-white transition-transform duration-300 hover:scale-105 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 lg:text-xl"
        >
          Update Password
        </button>
      </div>
    </form>
  );
}

export default UpdatePasswordForm;
