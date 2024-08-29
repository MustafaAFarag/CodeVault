import { useNavigate } from 'react-router-dom';
import { FaHeart } from 'react-icons/fa';
import { animate } from 'motion';

function FavoriteHeader() {
  const navigate = useNavigate();

  const handleMouseEnter = (e) => {
    animate(e.currentTarget, { scale: 1.1 }, { duration: 0.2 });
  };

  const handleMouseLeave = (e) => {
    animate(e.currentTarget, { scale: 1 }, { duration: 0.2 });
  };

  return (
    <button
      onClick={() => navigate('/favorites')}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="rounded-lg p-3 text-text transition-all duration-300 hover:bg-teal-200 focus:outline-none"
      aria-label="Favorites"
    >
      <FaHeart className="h-6 w-6 text-red-500" />
    </button>
  );
}

export default FavoriteHeader;
