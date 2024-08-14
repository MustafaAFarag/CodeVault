import supabase from './supabase';

export async function fetchNotes() {
  const { data, error } = await supabase.from('notes').select('*');

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
