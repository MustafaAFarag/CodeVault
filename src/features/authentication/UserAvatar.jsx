import { useUser } from './useUser';
function UserAvatar() {
  const { user } = useUser();
  const { full_name, avatar } = user;

  return (
    <div className="flex gap-3 items-center font-semibold font-base">
      <img
        className="block w-[2rem] h-[2.3rem] aspect-square object-cover object-center rounded-full outline-2 outline-red-500"
        src={avatar || 'default-user.jpg'}
        alt={`Avatar of ${full_name}`}
      />
      <span>{full_name}</span>
    </div>
  );
}

export default UserAvatar;
