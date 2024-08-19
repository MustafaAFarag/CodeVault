export function useFilteredNotes(data, selectedSubject) {
  if (!data) {
    return { subjects: [], filteredNotes: [] };
  }

  const notesBySubject = data.reduce((acc, note) => {
    if (!acc[note.subject_id]) {
      acc[note.subject_id] = {
        subject: note.subjects,
        notes: [],
      };
    }
    acc[note.subject_id].notes.push(note);
    return acc;
  }, {});

  const subjects = Object.values(notesBySubject).map((group) => group.subject);

  const filteredNotes = selectedSubject
    ? notesBySubject[selectedSubject]?.notes || []
    : [];

  return { subjects, filteredNotes };
}
