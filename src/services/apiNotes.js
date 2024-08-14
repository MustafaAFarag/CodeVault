import supabase from './supabase';

// Function to fetch notes from the database
export async function fetchNotes() {
  const { data, error } = await supabase.from('notes').select('*');

  if (error) {
    throw new Error('Notes could not be loaded: ' + error.message);
  }

  return data;
}

export async function updateRating(noteId, rating) {
  const { data, error } = await supabase
    .from('notes')
    .update({ rating })
    .match({ id: noteId });

  if (error) {
    throw new Error('Failed to update rating: ' + error.message);
  }

  return data;
}
