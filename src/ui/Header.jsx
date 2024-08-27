import { useEffect, useRef } from 'react';
import { animate } from 'motion';
import HeaderMenu from './HeaderMenu';
import FavoriteHeader from './FavoriteHeader';
import UserAvatar from '../features/authentication/UserAvatar';

function Header() {
  const headerRef = useRef(null);

  useEffect(() => {
    animate(
      headerRef.current,
      { opacity: [0, 1], transform: ['translateY(-10px)', 'translateY(0)'] },
      { duration: 0.5 },
    );
  }, []);

  return (
    <div
      ref={headerRef}
      className="py-6 px-8 border-b border-gray-300 flex justify-between items-center text-text bg-teal-50"
    >
      <FavoriteHeader />
      <header className="flex gap-3 items-center">
        <UserAvatar />
        <HeaderMenu />
      </header>
    </div>
  );
}

export default Header;
