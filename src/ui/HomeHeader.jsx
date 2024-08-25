import { useEffect, useRef } from 'react';
import { animate } from 'motion';
import Logo from './Logo';
import { Button } from 'primereact/button';
import { Link } from 'react-router-dom';

function HomeHeader() {
  const navRef = useRef(null);

  useEffect(() => {
    animate(navRef.current, { opacity: [0, 1] }, { duration: 1 });
  }, []);

  return (
    <header className="border-b border-secondary px-6 md:px-10 bg-white">
      <div className="flex justify-between items-center max-w-[105rem] mx-auto">
        <Logo>EduData</Logo>
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
              <Link to="/signup">
                <Button
                  label="Sign Up"
                  className="px-6 py-3 md:px-8 md:py-4 bg-secondary rounded-full font-semibold text-lg md:text-3xl text-text hover:bg-accent transition-all duration-300 shadow-lg"
                />
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default HomeHeader;
