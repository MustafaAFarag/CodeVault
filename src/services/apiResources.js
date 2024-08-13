import supabase from './supabase';

export async function fetchResources() {
  const { data: resourcesData, error: resourcesError } = await supabase
    .from('resources')
    .select('*');

  if (resourcesError) throw new Error('Resources could not be loaded');

  console.log(resourcesData);
  return { resourcesData };
}
