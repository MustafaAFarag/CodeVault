import { HiArrowRightOnRectangle } from 'react-icons/hi2';
import { useLogout } from './useLogout';
import SpinnerMini from '../../ui/SpinnerMini';

function Logout() {
  const { logout, isLoading } = useLogout();
  console.log(isLoading);
  return (
    <button
      className="flex items-center justify-center p-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
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
