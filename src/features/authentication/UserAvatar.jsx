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
      className="flex items-center gap-3 font-semibold"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <img
        className="hidden aspect-square h-12 w-12 rounded-full object-cover object-center outline-2 outline-teal-500 sm:block"
        src={avatar || 'default-user.jpg'}
        alt={`Avatar of ${full_name}`}
      />
      <span className="text-xl text-text">{full_name}</span>
    </div>
  );
}

export default UserAvatar;
