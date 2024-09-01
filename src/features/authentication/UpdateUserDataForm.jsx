// UpdateUserDataForm.js
import { useUser } from '../authentication/useUser';
import { useState } from 'react';
import { useUpdateUser } from './useUpdateUser';

function UpdateUserDataForm() {
  const {
    user: { full_name },
  } = useUser();

  const [fullName, setFullName] = useState(full_name);
  const [avatar, setAvatar] = useState(null);

  const { updateUser, isUpdating } = useUpdateUser();

  function handleSubmit(e) {
    e.preventDefault();
    if (!fullName) return;

    updateUser(
      { fullName, avatar },
      {
        onSuccess: () => {
          setAvatar(null);
          e.target.reset();
        },
      },
    );
  }

  function handleCancel() {
    setFullName(full_name);
    setAvatar(null);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Full Name Row */}
      <div className="flex flex-col space-y-2 border-b border-gray-300 py-2">
        <label htmlFor="fullName" className="text-lg font-semibold md:text-xl">
          Full Name
        </label>
        <input
          id="fullName"
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          disabled={isUpdating}
          className="rounded-lg border border-gray-300 p-2 text-base md:text-lg"
        />
      </div>

      {/* Avatar Row */}
      <div className="flex flex-col space-y-2 border-b border-gray-300 py-2">
        <label htmlFor="avatar" className="text-lg font-semibold md:text-xl">
          Avatar
        </label>
        <input
          id="avatar"
          type="file"
          onChange={(e) => setAvatar(e.target.files[0])}
          disabled={isUpdating}
          className="w-full rounded-lg border border-gray-300 p-2 text-base md:text-lg lg:w-auto"
        />
      </div>

      {/* Submit Button Row */}
      <div className="flex justify-end gap-4 pt-4">
        <button
          type="reset"
          disabled={isUpdating}
          onClick={handleCancel}
          className="transform rounded-lg bg-gray-200 px-4 py-2 text-base transition-transform hover:scale-105 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 md:text-lg"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isUpdating}
          className="w-full transform rounded-lg bg-teal-600 px-4 py-2 text-base text-white transition-transform hover:scale-105 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 lg:w-auto"
        >
          Update Account
        </button>
      </div>
    </form>
  );
}

export default UpdateUserDataForm;
