import supabase from './supabase';

export const addFavorite = async (userId, noteId) => {
  const { data, error } = await supabase
    .from('favorites')
    .insert([{ user_id: userId, note_id: noteId }]);

  if (error) {
    throw new Error(error.message);
  }
  return data;
};

export const removeFavorite = async (favoriteId) => {
  const { data, error } = await supabase
    .from('favorites')
    .delete()
    .match({ id: favoriteId });

  if (error) {
    throw new Error(error.message);
  }
  return data;
};

export const fetchFavorites = async (userId) => {
  const { data, error } = await supabase
    .from('favorites')
    .select('*,notes(*,subjects(*))')
    .eq('user_id', userId);

  if (error) {
    throw new Error(error.message);
  }

  return data;
};
