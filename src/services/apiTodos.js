import supabase from './supabase';

export async function fetchTodos() {
  const { data, error } = await supabase.from('todos').select('*');

  if (error) throw new Error(error.message);

  return data;
}
