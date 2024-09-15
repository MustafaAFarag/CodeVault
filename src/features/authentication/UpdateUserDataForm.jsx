import { useState, useRef, useCallback } from 'react';
import { useUser } from '../authentication/useUser';
import { useUpdateUser } from './useUpdateUser';
import AvatarEditor from 'react-avatar-editor';

function UpdateUserDataForm() {
  const {
    user: { full_name },
  } = useUser();

  const [fullName, setFullName] = useState(full_name);
  const [avatar, setAvatar] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [croppedImage, setCroppedImage] = useState(null);
  const [scale, setScale] = useState(1);

  const editorRef = useRef(null);
  const { updateUser, isUpdating } = useUpdateUser();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!fullName) return;

    updateUser(
      { fullName, avatar: croppedImage },
      {
        onSuccess: () => {
          setAvatar(null);
          setCroppedImage(null);
          setIsEditing(false);
          e.target.reset();
        },
      },
    );
  };

  const handleCancel = () => {
    setFullName(full_name);
    setAvatar(null);
    setCroppedImage(null);
    setIsEditing(false);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setAvatar(e.target.result);
        setIsEditing(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleResetAvatar = async () => {
    try {
      await updateUser({ fullName, avatar: '' });
      setAvatar(null);
      setCroppedImage(null);
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to reset avatar:', error);
    }
  };

  const handleCropComplete = useCallback(() => {
    if (editorRef.current) {
      const canvas = editorRef.current.getImageScaledToCanvas();
      canvas.toBlob((blob) => {
        if (blob) {
          const file = new File([blob], `avatar-${Date.now()}.jpg`, {
            type: 'image/jpeg',
          });
          setCroppedImage(file);
        }
      }, 'image/jpeg');
    }
  }, []);

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
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

      <div className="flex flex-col space-y-2 border-b border-gray-300 py-2">
        <label htmlFor="avatar" className="text-lg font-semibold md:text-xl">
          Avatar
        </label>
        <input
          id="avatar"
          type="file"
          onChange={handleFileChange}
          disabled={isUpdating}
          className="w-full rounded-lg border border-gray-300 p-2 text-base md:text-lg lg:w-auto"
        />
      </div>

      {isEditing && avatar && (
        <div className="flex flex-col items-center py-2">
          <AvatarEditor
            ref={editorRef}
            image={avatar}
            width={200}
            height={200}
            border={50}
            scale={scale}
            onImageReady={handleCropComplete}
            onImageChange={handleCropComplete}
            className="rounded-lg"
          />
          <input
            type="range"
            min="1"
            max="3"
            step="0.01"
            value={scale}
            onChange={(e) => {
              setScale(parseFloat(e.target.value));
              handleCropComplete();
            }}
            className="mt-2"
          />
        </div>
      )}

      <div className="flex justify-end gap-4 pt-4">
        <button
          type="button"
          disabled={isUpdating}
          onClick={handleResetAvatar}
          className="transform rounded-lg bg-gray-200 px-4 py-2 text-base transition-transform hover:scale-105 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 md:text-lg lg:text-xl"
        >
          Reset to Default
        </button>
        <button
          type="button"
          disabled={isUpdating}
          onClick={handleCancel}
          className="transform rounded-lg bg-gray-200 px-4 py-2 text-base transition-transform hover:scale-105 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 md:text-lg lg:text-xl"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isUpdating}
          className="w-full transform rounded-lg bg-teal-600 px-4 py-2 text-base text-white transition-transform hover:scale-105 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 lg:w-auto lg:text-xl"
        >
          Update Account
        </button>
      </div>
    </form>
  );
}

export default UpdateUserDataForm;
