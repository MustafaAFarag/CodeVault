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
      <div className="grid items-center grid-cols-[24rem_1fr_1.2fr] gap-6 py-4 border-b border-gray-300">
        <label htmlFor="password" className="font-semibold">
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
        />
        {errors.password && (
          <span className="text-red-700 text-base">
            {errors.password.message}
          </span>
        )}
      </div>

      {/* Confirm Password Row */}
      <div className="grid items-center grid-cols-[24rem_1fr_1.2fr] gap-6 py-4 border-b border-gray-300">
        <label htmlFor="passwordConfirm" className="font-semibold">
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
        />
        {errors.passwordConfirm && (
          <span className="text-red-700 text-base">
            {errors.passwordConfirm.message}
          </span>
        )}
      </div>

      {/* Submit Button Row */}
      <div className="flex justify-end gap-4 py-4">
        <button type="reset" onClick={reset} disabled={isUpdating}>
          Cancel
        </button>
        <button type="submit" disabled={isUpdating}>
          Update Password
        </button>
      </div>
    </form>
  );
}

export default UpdatePasswordForm;
