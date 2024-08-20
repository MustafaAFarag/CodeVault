/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
// NoteItem.jsx
import { FaStar } from 'react-icons/fa';
import CustomRating from './CustomRating';
import { memo, useState } from 'react';
import toast from 'react-hot-toast';

const NoteItem = memo(({ note, onRatingChange, user, isBestNote }) => {
  const [userRating, setUserRating] = useState(
    note.note_rating.find((rating) => rating.user_id === user.id) || 0,
  );
  console.log(userRating);
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

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-lg border border-gray-700 transition-all duration-300 hover:shadow-xl hover:bg-gray-700 relative">
      {/* Best Note Banner */}
      {isBestNote && (
        <div className="absolute top-0 right-0 rounded-b-lg bg-yellow-500 text-black font-bold px-2 py-1 rounded-br-lg text-sm">
          Best Note
        </div>
      )}

      <div className="flex justify-between items-center mt-2">
        <h2 className="text-xl font-semibold text-white mb-2">{note.title}</h2>
        <div className="flex items-center mb-2 mt-2">
          {note.average_rating !== null && (
            <FaStar className="text-yellow-400 mr-1" />
          )}
          <p className="text-sm text-gray-400">
            {note.average_rating !== null
              ? note.average_rating
              : 'No ratings yet'}
          </p>
        </div>
      </div>
      <p className="text-gray-300 mb-2">{note.description}</p>
      <a
        href={note.pdf_url}
        target="_blank"
        className="text-blue-400 underline mb-2 block"
        rel="noreferrer"
      >
        View PDF
      </a>
      <CustomRating
        value={userRating.rating}
        onChange={handleRatingChange}
        aria-label={`Rate this note titled ${note.title}`}
      />
    </div>
  );
});

export default NoteItem;
