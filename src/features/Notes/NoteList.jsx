/* eslint-disable react/prop-types */
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
  handleDeleteNote,
}) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-6">
        {notes.map((note) => (
          <NoteItem
            key={note.note_id}
            note={note}
            onRatingChange={onRatingChange}
            user={user}
            isBestNote={note.note_id === bestNoteId}
            handleDeleteNote={() => handleDeleteNote(note.note_id)}
          />
        ))}
      </div>
      <Paginator
        first={first}
        rows={rows}
        totalRecords={totalRecords}
        onPageChange={onPageChange}
        className="mt-6"
      />
    </div>
  );
}

export default NoteList;
