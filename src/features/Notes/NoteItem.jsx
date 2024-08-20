/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import { FaStar } from 'react-icons/fa';
import CustomRating from './CustomRating';
import { memo, useState } from 'react';
import toast from 'react-hot-toast';

const NoteItem = memo(({ note, onRatingChange, user, isBestNote }) => {
  const [userRating, setUserRating] = useState(
    note.note_rating.find((rating) => rating.user_id === user.id)?.rating || 0,
  );

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
    </div>
  );
});

export default NoteItem;
