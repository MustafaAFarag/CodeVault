// Deletion from Storage is bugged

/* eslint-disable no-unused-vars */
import supabase, { supabaseUrl } from './supabase';
import { getRandomLetter, sanitizeFileName } from './apiNotes';

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

async function uploadFile(file, bucket) {
  const uploadFolder = 'sheets_uploads';

  // Sanitize the file name
  const sanitizedFileName = sanitizeFileName(`${Date.now()}-${file.name}`);

  // Upload the file to the specified bucket
  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(`${uploadFolder}/${sanitizedFileName}`, file);

  if (error) {
    console.error('Upload error:', error.message);
    throw new Error('Failed to upload file');
  }

  // Get the public URL of the uploaded file
  const {
    data: { publicUrl },
    error: urlError,
  } = supabase.storage
    .from(bucket)
    .getPublicUrl(`${uploadFolder}/${sanitizedFileName}`);

  if (urlError) {
    console.error('URL fetch error:', urlError.message);
    throw new Error('Failed to get file URL');
  }

  return publicUrl;
}

// Updated uploadSheet function
async function uploadSheet({
  table,
  title,
  subject_id,
  file,
  description,
  bucket,
}) {
  // Upload the file and get the URL
  const url = await uploadFile(file, bucket);

  // Insert the sheet info into the database
  const { data, error } = await supabase
    .from(table)
    .insert([{ title, subject_id, url, description }]);

  if (error) {
    throw new Error('Failed to upload the sheet');
  }

  return data;
}

export async function uploadLectureSheet({
  title,
  subject_id,
  file,
  description,
}) {
  return uploadSheet({
    table: 'lecturesSheets',
    title,
    subject_id,
    file,
    description,
    bucket: 'lectures', // Specify the lectures bucket
  });
}

export async function uploadSectionSheet({
  title,
  subject_id,
  file,
  description,
}) {
  return uploadSheet({
    table: 'sectionSheets',
    title,
    subject_id,
    file,
    description,
    bucket: 'sections', // Specify the sections bucket
  });
}

async function deleteSheet({ table, sheetId, bucket }) {
  // Fetch the sheet details to get the URL
  const { data: sheetData, error: fetchError } = await supabase
    .from(table)
    .select('url')
    .eq('id', sheetId)
    .single();

  if (fetchError) {
    throw new Error('Failed to fetch sheet details');
  }

  // Extract the file name from the URL
  const fileName = sheetData.url.split('/').pop();

  // Delete the file from storage
  const { error: storageError } = await supabase.storage
    .from(bucket)
    .remove([fileName]);

  if (storageError) {
    throw new Error('Failed to delete the file from storage');
  }

  // Delete the sheet from the database
  const { error: deleteError } = await supabase
    .from(table)
    .delete()
    .eq('id', sheetId);

  if (deleteError) {
    throw new Error('Failed to delete the sheet from the database');
  }
}

export async function deleteLectureSheet(sheetId) {
  return deleteSheet({
    table: 'lecturesSheets',
    sheetId,
    bucket: 'lectures', // Specify the lectures bucket
  });
}

export async function deleteSectionSheet(sheetId) {
  return deleteSheet({
    table: 'sectionSheets',
    sheetId,
    bucket: 'sections', // Specify the sections bucket
  });
}
