import supabase from './supabase';

async function fetchSheets(table) {
  const { data: subjectsData, error: subjectsError } = await supabase
    .from('subjects')
    .select('*');

  if (subjectsError) throw new Error('Subjects could not be loaded');

  const { data: sheetsData, error: sheetsError } = await supabase
    .from(table)
    .select('*');

  if (sheetsError) throw new Error('Sheets could not be loaded');

  const sheetsBySubject = sheetsData.reduce((acc, sheet) => {
    if (!acc[sheet.subject_id]) acc[sheet.subject_id] = [];
    acc[sheet.subject_id].push(sheet);
    return acc;
  }, {});

  return { subjectsData, sheetsBySubject };
}

export async function fetchLecturesAndSheets() {
  return fetchSheets('lecturesSheets');
}

export async function fetchSectionsAndSheets() {
  return fetchSheets('sectionSheets');
}
