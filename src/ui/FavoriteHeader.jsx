import { useNavigate } from 'react-router-dom';
import { FaHeart } from 'react-icons/fa';
import { motion } from 'framer-motion';

function FavoriteHeader() {
  const navigate = useNavigate();

  return (
    <motion.button
      onClick={() => navigate('/favorites')}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 1 }}
      transition={{ duration: 0.2 }}
      className="rounded-lg p-3 text-text transition-all duration-300 hover:bg-teal-200 focus:outline-none"
      aria-label="Favorites"
    >
      <FaHeart className="h-6 w-6 text-red-500" />
    </motion.button>
  );
}

export default FavoriteHeader;
