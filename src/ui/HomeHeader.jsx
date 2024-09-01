import { motion } from 'framer-motion';
import Logo from './Logo';
import LinkButton from './LinkButton';
import { Link, useLocation } from 'react-router-dom';

function HomeHeader() {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <header
      className={`sticky top-0 z-50 border-b border-secondary px-4 py-3 md:px-10 ${
        isHomePage ? 'border-b-0 bg-transparent' : 'bg-white'
      }`}
    >
      <div className="mx-auto flex max-w-[105rem] items-center justify-between">
        <Logo width={70} height={70}>
          EduData
        </Logo>
        <motion.nav
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="z-10"
        >
          <ul className="flex items-center gap-4 md:gap-8 lg:gap-16">
            <li>
              <Link
                to="/about"
                className="text-lg text-text transition-colors hover:text-accent md:text-2xl lg:text-3xl"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/login"
                className="text-lg text-text transition-colors hover:text-accent md:text-2xl lg:text-3xl"
              >
                Login
              </Link>
            </li>
            <li>
              <LinkButton to="/signup" label="Sign Up" />
            </li>
          </ul>
        </motion.nav>
      </div>
    </header>
  );
}

export default HomeHeader;
