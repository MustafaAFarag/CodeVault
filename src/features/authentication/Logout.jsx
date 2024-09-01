import { useRef } from 'react';
import { motion } from 'framer-motion';
import { HiArrowRightOnRectangle } from 'react-icons/hi2';
import { useLogout } from './useLogout';
import SpinnerMini from '../../ui/SpinnerMini';

function Logout() {
  const { logout, isLoading } = useLogout();
  const buttonRef = useRef(null);

  return (
    <motion.button
      ref={buttonRef}
      className="flex items-center justify-center rounded-lg p-3 text-text transition-transform duration-300 hover:bg-teal-200 hover:text-text hover:outline-none hover:ring-2 hover:ring-accent hover:ring-offset-2"
      disabled={isLoading}
      onClick={logout}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.2 }}
    >
      {!isLoading ? (
        <HiArrowRightOnRectangle className="h-6 w-6" />
      ) : (
        <SpinnerMini />
      )}
    </motion.button>
  );
}

export default Logout;
