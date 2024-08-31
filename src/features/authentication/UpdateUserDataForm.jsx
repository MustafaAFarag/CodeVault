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
    <form onSubmit={handleSubmit}>
      {/* Full Name Row */}
      <div className="grid grid-cols-[24rem_1fr_1.2fr] items-center gap-6 border-b border-gray-300 py-4">
        <label htmlFor="fullName" className="font-semibold lg:text-xl">
          Full Name
        </label>
        <input
          id="fullName"
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          disabled={isUpdating}
          className="rounded-lg border border-gray-300 p-2 lg:text-xl"
        />
      </div>

      {/* Avatar Row */}
      <div className="grid grid-cols-[24rem_1fr_1.2fr] items-center gap-6 border-b border-gray-300 py-4">
        <label htmlFor="avatar" className="font-semibold lg:text-xl">
          Avatar
        </label>
        <input
          id="avatar"
          type="file"
          onChange={(e) => setAvatar(e.target.files[0])}
          disabled={isUpdating}
          className="rounded-lg border border-gray-300 p-2 lg:text-xl"
        />
      </div>

      {/* Submit Button Row */}
      <div className="flex justify-end gap-4 py-4">
        <button
          type="reset"
          disabled={isUpdating}
          onClick={handleCancel}
          className="transform rounded-lg bg-gray-200 px-4 py-2 transition-transform hover:scale-105 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 lg:text-xl"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isUpdating}
          className="transform rounded-lg bg-teal-600 px-4 py-2 text-white transition-transform hover:scale-105 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 lg:text-xl"
        >
          Update Account
        </button>
      </div>
    </form>
  );
}

export default UpdateUserDataForm;
