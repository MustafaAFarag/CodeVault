import HeaderMenu from './HeaderMenu';
import FavoriteHeader from './FavoriteHeader';
import UserAvatar from '../features/authentication/UserAvatar';

function Header() {
  return (
    <div className="py-4 px-8 border-b-2 border-border flex justify-between items-center text-text bg-background">
      <FavoriteHeader />
      <header className="flex gap-4">
        <UserAvatar />
        <HeaderMenu />
      </header>
    </div>
  );
}

export default Header;
