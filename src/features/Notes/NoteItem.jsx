/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import { FaTrash, FaHeart, FaRegHeart, FaStar } from 'react-icons/fa';
import { memo, useState, useEffect } from 'react';

import toast from 'react-hot-toast';

import {
  addFavorite,
  removeFavorite,
  fetchFavorites,
} from '../../services/apiFavoritesNotes';
import CustomRating from '../Notes/CustomRating';

const NoteItem = memo(
  ({ note, onRatingChange, user, isBestNote, handleDeleteNote }) => {
    const [userRating, setUserRating] = useState(
      note.note_rating.find((rating) => rating.user_id === user.id)?.rating ||
        0,
    );
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
      const checkFavorite = async () => {
        if (user) {
          try {
            const favoriteNotes = await fetchFavorites(user.id);
            setIsFavorite(favoriteNotes.includes(note.note_id));
          } catch (error) {
            console.error('Error fetching favorites:', error);
          }
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

    const canDelete =
      user &&
      (user.role === 'admin' ||
        user.role === 'super_admin' ||
        note.user_id === user.id);

    return (
      <div className="relative flex h-full flex-col rounded-lg border border-gray-200 bg-white p-4 shadow-md transition-all duration-300">
        {/* Best Note Banner */}
        {isBestNote && (
          <div className="absolute right-0 top-0 z-10 rounded-bl-lg bg-teal-400 px-2 py-1 text-sm font-bold text-white md:text-xl">
            Best Note
          </div>
        )}

        <h2 className="mb-2 mt-3 text-lg font-semibold text-teal-600 sm:mt-3 md:text-2xl">
          {note.title}
        </h2>

        <div className="mb-2 flex items-center justify-between">
          <div className="text-md mb-2 flex items-center md:text-xl">
            {note.average_rating !== null && (
              <FaStar className="mr-1 -translate-y-[0.15rem] text-yellow-400" />
            )}
            <p className="md:text-md text-sm text-gray-600">
              {note.average_rating !== null
                ? note.average_rating
                : 'No ratings yet'}
            </p>
            <p className="md:text-md ml-2 text-xs text-gray-500">
              ({note.note_rating.length} ratings)
            </p>
          </div>

          {canDelete && (
            <button
              onClick={() => handleDeleteNote(note.note_id)}
              className="z-20 -translate-y-2 rounded-full border border-red-300 bg-red-50 p-2 text-red-500 shadow-md transition-all duration-300 hover:bg-red-100"
              aria-label="Delete note"
            >
              <FaTrash />
            </button>
          )}
        </div>

        <p className="mb-4 text-sm text-gray-700 md:text-xl">
          {note.description}
        </p>

        <p className="mb-4 mt-auto text-sm text-gray-500 md:text-xl">
          Author: {note.author || 'Unknown'}
        </p>

        <a
          href={note.pdf_url}
          target="_blank"
          className="mb-5 mt-auto block rounded-lg bg-secondary px-3 py-2 text-center text-sm font-semibold text-text transition-all duration-300 hover:bg-accent md:px-5 md:py-3 md:text-xl"
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
          className={`absolute bottom-2 right-4 z-20 rounded-full p-2 text-lg shadow-md transition-all duration-300 md:p-3 ${
            isFavorite
              ? 'border-red-300 bg-red-50 hover:bg-red-100'
              : 'border-gray-300 bg-teal-50 hover:bg-teal-100'
          }`}
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          {isFavorite ? (
            <FaHeart className="text-red-400" />
          ) : (
            <FaRegHeart className="text-gray-400" />
          )}
        </button>
      </div>
    );
  },
);

export default NoteItem;
