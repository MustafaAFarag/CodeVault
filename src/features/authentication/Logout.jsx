import { useEffect, useRef } from 'react';
import { animate } from 'motion';
import { HiArrowRightOnRectangle } from 'react-icons/hi2';
import { useLogout } from './useLogout';
import SpinnerMini from '../../ui/SpinnerMini';

function Logout() {
  const { logout, isLoading } = useLogout();
  const buttonRef = useRef(null);

  useEffect(() => {
    if (buttonRef.current) {
      animate(buttonRef.current, { scale: [1, 1] }, { duration: 0.2 });
    }
  }, []);

  const handleMouseEnter = () => {
    animate(buttonRef.current, { scale: 1.1 }, { duration: 0.2 });
  };

  const handleMouseLeave = () => {
    animate(buttonRef.current, { scale: 1 }, { duration: 0.2 });
  };

  return (
    <button
      ref={buttonRef}
      className="flex items-center justify-center p-3 text-text rounded-lg hover:bg-teal-200 hover:text-text focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 transition-transform duration-300"
      disabled={isLoading}
      onClick={logout}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {!isLoading ? (
        <HiArrowRightOnRectangle className="w-6 h-6" />
      ) : (
        <SpinnerMini />
      )}
    </button>
  );
}

export default Logout;
