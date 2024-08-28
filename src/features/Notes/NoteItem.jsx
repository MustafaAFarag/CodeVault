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

    const isAdmin =
      user && (user.role === 'admin' || user.role === 'super_admin');

    return (
      <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200 transition-all duration-300 relative flex flex-col h-full">
        {/* Best Note Banner */}
        {isBestNote && (
          <div className="absolute top-0 right-0 bg-teal-400 text-white font-bold px-2 py-1 rounded-bl-lg text-xl z-10">
            Best Note
          </div>
        )}

        <h2 className="text-2xl font-semibold text-teal-600 mb-2">
          {note.title}
        </h2>

        <div className="flex items-center mb-2 text-xl">
          {note.average_rating !== null && (
            <FaStar className="text-yellow-400 mr-1 -translate-y-[0.15rem]" />
          )}
          <p className="text-md text-gray-600">
            {note.average_rating !== null
              ? note.average_rating
              : 'No ratings yet'}
          </p>
          <p className="text-md text-gray-500 ml-2">
            ({note.note_rating.length} ratings)
          </p>
        </div>

        <p className="text-gray-700 mb-4 text-xl">{note.description}</p>

        <p className="text-xl text-gray-500 mb-4 mt-auto">
          Author: {note.author || 'Unknown'}
        </p>

        <a
          href={note.pdf_url}
          target="_blank"
          className="mt-auto block text-text bg-secondary hover:bg-accent rounded-lg py-3 px-5 font-semibold text-xl text-center transition-all duration-300 mb-5"
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
          className={`absolute bottom-4 right-4 z-20 p-3 text-lg rounded-full shadow-md  transition-all duration-300  ${
            isFavorite
              ? 'bg-red-50 border-red-300 hover:bg-red-100'
              : 'bg-teal-50 border-gray-300 hover:bg-teal-100'
          }`}
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          {isFavorite ? (
            <FaHeart className="text-red-400" />
          ) : (
            <FaRegHeart className="text-gray-400" />
          )}
        </button>

        {/* Delete Button for Admins */}
        {isAdmin && (
          <button
            onClick={() => handleDeleteNote(note.note_id)}
            className="absolute top-4 right-4 z-20 p-2 bg-red-50 text-red-500 rounded-full shadow-md border border-red-300 transition-all duration-300 hover:bg-red-100"
            aria-label="Delete note"
          >
            <FaTrash />
          </button>
        )}
      </div>
    );
  },
);

export default NoteItem;
