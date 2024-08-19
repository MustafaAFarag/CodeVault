/* eslint-disable react/prop-types */
import { FaStar } from 'react-icons/fa';
import { Rating } from 'primereact/rating';

function NoteItem({ note, onRatingChange, user }) {
  const handleRatingChange = (ratingValue) => {
    if (!user) return alert('You must be logged in to rate notes.');

    if (!note.note_id || !ratingValue || !user.id) {
      console.error('Missing data:', {
        noteId: note.note_id,
        ratingValue,
        userId: user.id,
      });
      return;
    }

    onRatingChange(note.note_id, ratingValue);
  };

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-lg border border-gray-700 transition-all duration-300 hover:shadow-xl hover:bg-gray-700">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-white mb-2">{note.title}</h2>
        <div className="flex items-center mb-2">
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
      >
        View PDF
      </a>
      <Rating
        value={note.user_rating || 0} // Display user's rating if available
        onChange={(e) => handleRatingChange(e.value)}
        cancel={false}
        className="my-2"
      />
    </div>
  );
}

export default NoteItem;
