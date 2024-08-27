import { useNavigate } from 'react-router-dom';
import { FaBookmark } from 'react-icons/fa';
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
      className="text-text hover:bg-teal-200 p-3 rounded-lg focus:outline-none transition-all duration-300"
      aria-label="Favorites"
    >
      <FaBookmark className="h-6 w-6" />
    </button>
  );
}

export default FavoriteHeader;
