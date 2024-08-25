import supabase from './supabase';

export async function fetchTodos() {
  const { data, error } = await supabase.from('todos').select('*');

  if (error) throw new Error(error.message);

  return data;
}

export async function deleteTodo(id) {
  const { error } = await supabase.from('todos').delete().eq('id', id);

  if (error) throw new Error(error.message);
}

export async function createTodo(todo) {
  const { data, error } = await supabase.from('todos').insert([todo]);

  if (error) throw new Error(error.message);

  return data;
}
