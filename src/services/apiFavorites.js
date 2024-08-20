import supabase from './supabase';

export const addFavorite = async (noteId, userId) => {
  const { error } = await supabase
    .from('favorites')
    .insert([{ note_id: noteId, user_id: userId }]);
  if (error) throw new Error(error.message);
};

export const removeFavorite = async (noteId, userId) => {
  const { error } = await supabase
    .from('favorites')
    .delete()
    .match({ note_id: noteId, user_id: userId });
  if (error) throw new Error(error.message);
};

export const checkFavorite = async (noteId, userId) => {
  const { data, error } = await supabase
    .from('favorites')
    .select('*')
    .match({ note_id: noteId, user_id: userId });
  if (error) throw new Error(error.message);
  return data.length > 0;
};

export const getFavorites = async (userId) => {
  const { data, error } = await supabase
    .from('favorites')
    .select('note_id')
    .match({ user_id: userId });
  if (error) throw new Error(error.message);
  return data;
};
