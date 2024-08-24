/* eslint-disable no-unused-vars */
import supabase, { supabaseUrl } from './supabase';

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

async function uploadFile(file) {
  const fileName = `${Date.now()}-${file.name}`;
  const { data, error } = await supabase.storage
    .from('lectures')
    .upload(fileName, file);

  if (error) {
    console.error('Upload error:', error.message);
    throw new Error('Failed to upload file');
  }

  const {
    data: { publicUrl },
    error: urlError,
  } = supabase.storage.from('lectures').getPublicUrl(fileName);

  if (urlError) {
    console.error('URL fetch error:', urlError.message);
    throw new Error('Failed to get file URL');
  }

  return publicUrl;
}

// Updated uploadSheet function
async function uploadSheet({ table, title, subject_id, file }) {
  // Upload the file and get the URL
  const url = await uploadFile(file);

  // Insert the sheet info into the database
  const { data, error } = await supabase
    .from(table)
    .insert([{ title, subject_id, url }]);

  if (error) {
    throw new Error('Failed to upload the sheet');
  }

  return data;
}

export async function uploadLectureSheet({ title, subject_id, file }) {
  return uploadSheet({
    table: 'lecturesSheets',
    title,
    subject_id,
    file,
  });
}

export async function uploadSectionSheet({ title, subject_id, file }) {
  return uploadSheet({
    table: 'sectionSheets',
    title,
    subject_id,
    file,
  });
}

// 71siqy
