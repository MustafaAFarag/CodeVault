import supabase from './supabase';

export async function fetchNotes() {
  const { data, error } = await supabase.from('notes').select(`
      *,
      note_rating(*),
      subjects(*)
    `);

  if (error) throw new Error(error.message);

  // Calculate the average rating for each note
  const notesWithAverage = data.map((note) => {
    const totalRating = note.note_rating.reduce(
      (acc, rating) => acc + rating.rating,
      0,
    );
    const averageRating =
      note.note_rating.length > 0
        ? (totalRating / note.note_rating.length).toFixed(2)
        : null;
    return { ...note, average_rating: averageRating };
  });

  return notesWithAverage;
}
