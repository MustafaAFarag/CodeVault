import Logout from '../features/authentication/Logout';

function Header() {
  return (
    <header className="py-4 px-8 border-b-2 border-border flex justify-end items-center gap-6 text-text bg-background">
      <Logout />
    </header>
  );
}

export default Header;
