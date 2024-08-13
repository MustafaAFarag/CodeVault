import supabase from './supabase';

export async function fetchLecturesAndSheets() {
  // Fetch subjects
  const { data: subjectsData, error: subjectsError } = await supabase
    .from('subjects')
    .select('*');

  if (subjectsError) throw new Error('Subjects could not be loaded');

  // Fetch sheets
  const { data: sheetsData, error: sheetsError } = await supabase
    .from('sheets')
    .select('*');

  if (sheetsError) throw new Error('Sheets could not be loaded');

  // Group sheets by their subject_id
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
