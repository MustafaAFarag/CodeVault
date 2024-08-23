import supabase from './supabase';

export async function addTagToUser({ userId, tagId }) {
  const { error } = await supabase
    .from('user_tags')
    .insert([{ user_id: userId, tag_id: tagId }]);
  if (error) throw new Error(error.message);
}

export async function removeTagFromUser({ userId, tagId }) {
  const { error } = await supabase
    .from('user_tags')
    .delete()
    .match({ user_id: userId, tag_id: tagId });
  if (error) throw new Error(error.message);
}

export async function createTag({ name, type }) {
  const { error } = await supabase.from('tags').insert([{ name, type }]);
  if (error) throw new Error(error.message);
}

export async function deleteTag(tagId) {
  const { error } = await supabase.from('tags').delete().match({ id: tagId });
  if (error) throw new Error(error.message);
}
