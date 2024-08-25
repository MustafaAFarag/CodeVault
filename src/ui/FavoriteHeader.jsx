import { useNavigate } from 'react-router-dom';
import { FaBookmark } from 'react-icons/fa'; // Import the bookmark icon

function FavoriteHeader() {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate('/favorites')}
      className="text-text hover:text-accent focus:outline-none"
      aria-label="Favorites"
    >
      <FaBookmark className="h-6 w-6" />
    </button>
  );
}

export default FavoriteHeader;
