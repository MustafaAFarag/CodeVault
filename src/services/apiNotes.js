import supabase from './supabase';

export async function fetchNotes() {
  const { data, error } = await supabase.from('notes').select(`
      *,
      noteRating(*)
    `);

  if (error) throw new Error(error.message);

  return data;
}
