import { HiOutlineUser } from 'react-icons/hi';
import Logout from '../features/authentication/Logout';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

function HeaderMenu() {
  const navigate = useNavigate();

  return (
    <ul className="flex items-center md:gap-2">
      <li>
        <motion.button
          onClick={() => navigate('/account')}
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.2 }}
          className="flex items-center justify-center rounded-lg p-3 text-gray-800 transition-all duration-300 hover:bg-teal-200 hover:text-gray-900 hover:outline-none hover:ring-2 hover:ring-accent hover:ring-offset-2"
        >
          <HiOutlineUser className="h-6 w-6" />
        </motion.button>
      </li>
      <li>
        <Logout />
      </li>
    </ul>
  );
}

export default HeaderMenu;
