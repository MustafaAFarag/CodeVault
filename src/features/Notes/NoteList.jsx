/* eslint-disable react/prop-types */
import NoteItem from './NoteItem';

function NoteList({ notes, onRatingChange, user, bestNoteId }) {
  console.log(notes);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {notes.map((note) => (
        <NoteItem
          key={note.note_id}
          note={note}
          onRatingChange={onRatingChange}
          user={user}
          isBestNote={note.note_id === bestNoteId}
        />
      ))}
    </div>
  );
}

export default NoteList;
