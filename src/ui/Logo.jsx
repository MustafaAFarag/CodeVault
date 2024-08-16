import { Link } from 'react-router-dom';

function Logo() {
  return (
    <div className="flex items-center justify-center">
      <Link to="/" className="flex items-center gap-4 z-50">
        <img
          alt="NoteVault Logo"
          loading="lazy"
          src="./logo-light.png"
          className="h-[6.6rem] w-auto"
        />
      </Link>
    </div>
  );
}

export default Logo;
