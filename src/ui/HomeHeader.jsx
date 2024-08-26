import { useEffect, useRef } from 'react';
import { animate } from 'motion';
import Logo from './Logo';
import LinkButton from './LinkButton';
import { Link, useLocation } from 'react-router-dom';

function HomeHeader() {
  const navRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    animate(navRef.current, { opacity: [0, 1] }, { duration: 1 });
  }, []);

  const isHomePage = location.pathname === '/';

  return (
    <header
      className={`sticky top-0 z-50 border-b border-secondary px-6 md:px-10 ${
        isHomePage ? 'bg-transparent border-b-0' : 'bg-white'
      }`}
    >
      <div className="flex justify-between items-center max-w-[105rem] mx-auto">
        <Logo width={90} height={90}>
          EduData
        </Logo>
        <nav ref={navRef} className="text-xl z-10">
          <ul className="flex gap-8 md:gap-16 items-center">
            <li>
              <Link
                to="/about"
                className="text-text hover:text-accent transition-colors text-xl md:text-3xl"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/login"
                className="text-text hover:text-accent transition-colors text-xl md:text-3xl"
              >
                Login
              </Link>
            </li>
            <li>
              <LinkButton to="/signup" label="Sign Up" />
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default HomeHeader;
