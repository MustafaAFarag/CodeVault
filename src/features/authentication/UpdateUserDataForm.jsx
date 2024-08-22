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
      <div className="grid items-center grid-cols-[24rem_1fr_1.2fr] gap-6 py-4 border-b border-gray-300">
        <label htmlFor="fullName" className="font-semibold">
          Full Name
        </label>
        <input
          id="fullName"
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          disabled={isUpdating}
        />
      </div>

      {/* Avatar Row */}
      <div className="grid items-center grid-cols-[24rem_1fr_1.2fr] gap-6 py-4 border-b border-gray-300">
        <label htmlFor="avatar" className="font-semibold">
          Avatar
        </label>
        <input
          id="avatar"
          type="file"
          onChange={(e) => setAvatar(e.target.files[0])}
          disabled={isUpdating}
        />
      </div>

      {/* Submit Button Row */}
      <div className="flex justify-end gap-4 py-4">
        <button type="reset" disabled={isUpdating} onClick={handleCancel}>
          Cancel
        </button>
        <button type="submit" disabled={isUpdating}>
          Update Account
        </button>
      </div>
    </form>
  );
}

export default UpdateUserDataForm;
