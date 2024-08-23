import supabase from './supabase';

export const addLog = async (actionType, userId) => {
  const { error } = await supabase
    .from('logs')
    .insert([{ action_type: actionType, user_id: userId }]);
  if (error) throw new Error(error.message);
};

export const fetchLogs = async () => {
  const { data, error } = await supabase
    .from('logs')
    .select('*,users(*)')
    .order('created_at', { ascending: false });
  if (error) throw new Error(error.message);
  return data;
};
