import { HiOutlineUser } from 'react-icons/hi';
import Logout from '../features/authentication/Logout';
import { useNavigate } from 'react-router-dom';
import { animate } from 'motion';

function HeaderMenu() {
  const navigate = useNavigate();

  const handleMouseEnter = (e) => {
    animate(e.currentTarget, { scale: 1.1 }, { duration: 0.2 });
  };

  const handleMouseLeave = (e) => {
    animate(e.currentTarget, { scale: 1 }, { duration: 0.2 });
  };

  return (
    <ul className="flex items-center gap-3">
      <li>
        <button
          onClick={() => navigate('/account')}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="flex items-center justify-center rounded-lg p-3 text-gray-800 transition-all duration-300 hover:bg-teal-200 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
        >
          <HiOutlineUser className="h-6 w-6" />
        </button>
      </li>
      <li>
        <Logout />
      </li>
    </ul>
  );
}

export default HeaderMenu;
