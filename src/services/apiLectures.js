import supabase from './supabase';

export async function fetchLecturesAndSheets() {
  const { data: subjectsData, error: subjectsError } = await supabase
    .from('subjects')
    .select('*');

  if (subjectsError) throw new Error('Cabins could not be loaded');

  const { data: sheetsData, error: sheetsError } = await supabase
    .from('sheets')
    .select('*');

  if (sheetsError) throw new Error('Cabins could not be loaded');

  const sheetsBySubject = sheetsData.reduce((acc, sheet) => {
    if (!acc[sheet.subject_id]) acc[sheet.subject_id] = [];
    acc[sheet.subject_id].push(sheet);
    return acc;
  }, {});

  return {
    subjectsData,
    sheetsBySubject,
  };
}
