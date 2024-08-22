import HeaderMenu from './HeaderMenu';
import UserAvatar from '../features/authentication/UserAvatar';

function Header() {
  return (
    <header className="py-4 px-8 border-b-2 border-border flex justify-end items-center gap-4 text-text bg-background">
      <UserAvatar />
      <HeaderMenu />
    </header>
  );
}

export default Header;
