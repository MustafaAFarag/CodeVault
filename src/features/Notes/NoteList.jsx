/* eslint-disable react/prop-types */
// NoteList.jsx
import { Paginator } from 'primereact/paginator';
import NoteItem from './NoteItem';

function NoteList({
  notes,
  onRatingChange,
  user,
  bestNoteId,
  totalRecords,
  first,
  rows,
  onPageChange,
}) {
  return (
    <div>
      {/* Grid Container */}
      <div className="grid grid-cols-3 gap-4 mb-4">
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
      <Paginator
        first={first}
        rows={rows}
        totalRecords={totalRecords}
        onPageChange={onPageChange}
        className="mt-4"
      />
    </div>
  );
}

export default NoteList;
