import supabase from './supabase';

export async function fetchSubjects() {
  const { data, error } = await supabase.from('subjects').select('*');

  if (error) throw new Error(error.message);

  return data;
}

export async function fetchNotes() {
  const { data, error } = await supabase.from('notes').select(`
      *,
      note_rating(*),
      users(*),
      subjects(*)
    `);

  if (error) throw new Error(error.message);

  const notesWithAverage = data.map((note) => {
    const totalRating = note.note_rating.reduce(
      (acc, rating) => acc + rating.rating,
      0,
    );
    const averageRating =
      note.note_rating.length > 0
        ? (totalRating / note.note_rating.length).toFixed(2)
        : null;
    return { ...note, average_rating: averageRating };
  });

  return notesWithAverage;
}

export async function rateNote(noteId, ratingValue, userId) {
  const { error } = await supabase.from('note_rating').upsert(
    { note_id: noteId, user_id: userId, rating: ratingValue },
    { onConflict: ['note_id', 'user_id'] }, // Now this works because of the unique constraint
  );

  if (error) {
    throw new Error(error.message);
  }
}

export async function deleteNote(noteId) {
  const { error: ratingError } = await supabase
    .from('note_rating')
    .delete()
    .eq('note_id', noteId);

  if (ratingError) {
    throw new Error(ratingError.message);
  }

  const { error: noteError } = await supabase
    .from('notes')
    .delete()
    .eq('note_id', noteId);

  if (noteError) {
    throw new Error(noteError.message);
  }
}

export async function updateNote(noteId, updatedNote) {
  const { error } = await supabase
    .from('notes')
    .update(updatedNote)
    .eq('note_id', noteId);

  if (error) {
    throw new Error(error.message);
  }
}

// Function to generate a random letter
export function getRandomLetter() {
  const letters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  return letters.charAt(Math.floor(Math.random() * letters.length));
}

// Function to sanitize the file name
export function sanitizeFileName(fileName) {
  return fileName
    .split('')
    .map((char) => (char.match(/[^a-zA-Z0-9.-]/) ? getRandomLetter() : char))
    .join('')
    .replace(/_+/g, '_')
    .replace(/^_+|_+$/g, '');
}

export async function uploadNote({
  title,
  description,
  subject_id,
  pdf,
  user_id,
  author,
}) {
  // Sanitize the file name
  const sanitizedFileName = sanitizeFileName(pdf.name);
  const uploadFolder = 'user_uploads';

  // Upload the PDF file to Supabase Storage with the sanitized file name
  const { data: pdfData, error: uploadError } = await supabase.storage
    .from('notes')
    .upload(`${uploadFolder}/${sanitizedFileName}`, pdf);

  if (uploadError) throw new Error(uploadError.message);

  // Construct the full URL for the uploaded PDF
  const pdfUrl = `https://vgbfbajsepobgszdnpic.supabase.co/storage/v1/object/public/notes/${pdfData.path}`;

  // Insert the note details into the 'notes' table
  const { data, error } = await supabase.from('notes').insert([
    {
      title,
      description,
      subject_id,
      pdf_url: pdfUrl,
      user_id,
      author,
    },
  ]);

  if (error) throw new Error(error.message);

  return data;
}
