// Deletion from Storage is bugged

import supabase from './supabase';
import { sanitizeFileName } from './apiNotes';

export async function fetchTodos() {
  const { data, error } = await supabase.from('todos').select(`
      *,
      subjects (
        name
      )
    `);

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

export async function uploadFileToSupabase(file) {
  // Sanitize the file name to handle non-ASCII characters and special symbols
  const sanitizedFileName = sanitizeFileName(file.name);
  const uploadFolder = 'files'; // Adjust this if needed

  // Upload the file to Supabase Storage with the sanitized file name
  const { error: uploadError } = await supabase.storage
    .from('todos')
    .upload(`${uploadFolder}/${sanitizedFileName}`, file);

  if (uploadError) {
    throw new Error(uploadError.message);
  }

  // Construct the full URL for the uploaded file
  const { data: urlData, error: urlError } = supabase.storage
    .from('todos')
    .getPublicUrl(`${uploadFolder}/${sanitizedFileName}`);

  if (urlError) {
    throw new Error('Failed to generate file URL');
  }

  // Return the public URL of the uploaded file
  return urlData.publicUrl;
}
