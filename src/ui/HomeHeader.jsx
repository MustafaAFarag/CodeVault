import { Link } from 'react-router-dom';

function HomeHeader() {
  return (
    <header className="border-b border-gray-800 px-8 py-5">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <a href="/" className="flex items-center gap-4 z-50">
          <img
            alt="NoteVault Logo"
            loading="lazy"
            src="./logo-light.png"
            width="90"
            height="90"
          />
          <span className="text-xl font-semibold text-white">NoteVault</span>
        </a>
        <nav className="text-xl z-10">
          <ul className="flex gap-16 items-center">
            <li>
              <Link
                to="/notes"
                className="text-white hover:text-gray-300 transition-colors"
              >
                Notes
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="text-white hover:text-gray-300 transition-colors"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/login"
                className="text-white hover:text-gray-300 transition-colors"
              >
                Login / Signup
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default HomeHeader;
