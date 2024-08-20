/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
/* NoteItem.jsx */
import { FaStar, FaRegStar } from 'react-icons/fa';
import { memo, useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import {
  addFavorite,
  removeFavorite,
  fetchFavorites,
} from '../../services/apiFavorites';
import CustomRating from '../Notes/CustomRating';

const NoteItem = memo(({ note, onRatingChange, user, isBestNote }) => {
  const [userRating, setUserRating] = useState(
    note.note_rating.find((rating) => rating.user_id === user.id)?.rating || 0,
  );
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const checkFavorite = async () => {
      if (user) {
        const favoriteNotes = await fetchFavorites(user.id);
        setIsFavorite(favoriteNotes.includes(note.note_id));
      }
    };
    checkFavorite();
  }, [note.note_id, user]);

  const handleRatingChange = (ratingValue) => {
    if (!user) {
      return toast.error('You must be logged in to rate notes.');
    }

    if (!note.note_id || !ratingValue || !user.id) {
      console.error('Missing data:', {
        noteId: note.note_id,
        ratingValue,
        userId: user.id,
      });
      return;
    }

    setUserRating(ratingValue);
    onRatingChange(note.note_id, ratingValue);
  };

  const handleFavoriteToggle = async () => {
    if (!user) {
      return toast.error('You must be logged in to favorite notes.');
    }

    try {
      if (isFavorite) {
        await removeFavorite(user.id, note.note_id);
        setIsFavorite(false);
        toast.success('Removed from favorites!');
      } else {
        await addFavorite(user.id, note.note_id);
        setIsFavorite(true);
        toast.success('Added to favorites!');
      }
    } catch (error) {
      toast.error(`Error: ${error.message}`);
    }
  };

  return (
    <div className="bg-white p-5 rounded-lg shadow-md border border-gray-300 transition-all duration-300 hover:shadow-lg  relative">
      {/* Best Note Banner */}
      {isBestNote && (
        <div className="absolute top-0 right-0 bg-[#D2AF84] text-white font-bold px-3 py-1 rounded-bl-lg text-sm">
          Best Note
        </div>
      )}

      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-secondary mb-4">{note.title}</h2>
        <div className="flex items-center">
          {note.average_rating !== null && (
            <FaStar className="text-yellow-400 mr-2" />
          )}
          <p className="text-lg text-gray-600">
            {note.average_rating !== null
              ? note.average_rating
              : 'No ratings yet'}
          </p>
        </div>
      </div>

      <p className="text-gray-700 mb-4">{note.description}</p>
      <a
        href={note.pdf_url}
        target="_blank"
        className="mt-auto block text-white bg-accent hover:bg-blue-600 rounded-lg py-2 text-center transition-all duration-300"
        rel="noreferrer"
      >
        View PDF
      </a>
      <CustomRating
        value={userRating}
        onChange={handleRatingChange}
        aria-label={`Rate this note titled ${note.title}`}
      />
      <button
        onClick={handleFavoriteToggle}
        className="absolute top-2 right-2"
        aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
      >
        {isFavorite ? (
          <FaStar className="text-yellow-400" />
        ) : (
          <FaRegStar className="text-gray-400" />
        )}
      </button>
    </div>
  );
});

export default NoteItem;
