import { useEffect, useRef } from 'react';
import { animate } from 'motion';
import HeaderMenu from './HeaderMenu';
import FavoriteHeader from './FavoriteHeader';
import UserAvatar from '../features/authentication/UserAvatar';

function Header() {
  const headerRef = useRef(null);

  useEffect(() => {
    animate(headerRef.current, { opacity: [0, 1] }, { duration: 0.5 });
  }, []);

  return (
    <div
      ref={headerRef}
      className="flex items-center justify-between gap-10 border-b border-gray-300 bg-teal-600 px-6 py-4 text-text md:px-8 md:py-6"
    >
      <FavoriteHeader />
      <header className="mr-1 flex items-center md:gap-3">
        <UserAvatar />
        <HeaderMenu />
      </header>
    </div>
  );
}

export default Header;
