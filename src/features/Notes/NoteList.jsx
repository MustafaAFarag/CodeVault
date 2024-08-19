/* eslint-disable react/prop-types */
import NoteItem from './NoteItem';

function NoteList({ notes, onRatingChange, user }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {notes.map((note) => (
        <NoteItem
          key={note.id}
          note={note}
          onRatingChange={onRatingChange}
          user={user}
        />
      ))}
    </div>
  );
}

export default NoteList;
