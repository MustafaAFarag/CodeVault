import { HiOutlineUser } from 'react-icons/hi2';
import Logout from '../features/authentication/Logout';
import { useNavigate } from 'react-router-dom';

function HeaderMenu() {
  const navigate = useNavigate();
  return (
    <ul className="flex gap-4">
      <li>
        <button
          onClick={() => navigate('/account')}
          className="flex items-center justify-center p-3 bg-background-secondary text-text rounded-lg hover:bg-secondary hover:text-background focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 transition-all duration-300"
        >
          <HiOutlineUser />
        </button>
      </li>
      <li>
        <Logout />
      </li>
    </ul>
  );
}

export default HeaderMenu;
