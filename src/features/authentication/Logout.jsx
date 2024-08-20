import { HiArrowRightOnRectangle } from 'react-icons/hi2';
import { useLogout } from './useLogout';
import SpinnerMini from '../../ui/SpinnerMini';

function Logout() {
  const { logout, isLoading } = useLogout();

  return (
    <button
      className="flex items-center justify-center p-3 bg-secondary text-background rounded-lg hover:bg-primary hover:text-background focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 transition-all duration-300"
      disabled={isLoading}
      onClick={logout}
    >
      {!isLoading ? (
        <HiArrowRightOnRectangle className="w-4 h-4" />
      ) : (
        <SpinnerMini />
      )}
    </button>
  );
}

export default Logout;
