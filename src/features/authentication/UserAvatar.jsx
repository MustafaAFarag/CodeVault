import { useUser } from './useUser';
import { animate } from 'motion';

function UserAvatar() {
  const { user } = useUser();
  const { full_name, avatar } = user;

  const handleMouseEnter = (e) => {
    animate(e.currentTarget, { scale: 1.05 }, { duration: 0.2 });
  };

  const handleMouseLeave = (e) => {
    animate(e.currentTarget, { scale: 1 }, { duration: 0.2 });
  };

  return (
    <div
      className="flex gap-3 items-center font-semibold"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <img
        className="block w-12 h-12 aspect-square object-cover object-center rounded-full outline-2 outline-teal-500"
        src={avatar || 'default-user.jpg'}
        alt={`Avatar of ${full_name}`}
      />
      <span className="text-text text-xl">{full_name}</span>
    </div>
  );
}

export default UserAvatar;
