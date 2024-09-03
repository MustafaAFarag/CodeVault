import { motion } from 'framer-motion';
import HeaderMenu from './HeaderMenu';
import FavoriteHeader from './FavoriteHeader';
import UserAvatar from '../features/authentication/UserAvatar';

function Header() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="col-start-2 row-start-1 flex items-center justify-between gap-10 border-b border-gray-300 bg-teal-600 px-6 py-4 text-text md:px-8 md:py-6"
    >
      <FavoriteHeader />
      <header className="flex md:gap-3">
        <UserAvatar />
        <HeaderMenu />
      </header>
    </motion.div>
  );
}

export default Header;
