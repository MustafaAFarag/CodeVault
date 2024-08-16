import { Link } from 'react-router-dom';

function HomeHeader() {
  return (
    <header className="border-b border-secondary px-8 py-5 bg-background">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <Link to="/" className="flex items-center gap-4 z-50">
          <img
            alt="NoteVault Logo"
            loading="lazy"
            src="./logo-light.png"
            width="90"
            height="90"
          />
          <span className="text-xl font-semibold text-primary">NoteVault</span>
        </Link>
        <nav className="text-xl z-10">
          <ul className="flex gap-16 items-center">
            <li>
              <Link
                to="/about"
                className="text-text hover:text-accent transition-colors"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/login"
                className="text-text hover:text-accent transition-colors"
              >
                Login
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default HomeHeader;
