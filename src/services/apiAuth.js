import supabase, { supabaseUrl } from './supabase';

// Function to create a new user in the 'users' table after signing up
async function createUserInDatabase(userId, fullName) {
  const { data, error } = await supabase.from('users').insert([
    {
      id: userId,
      full_name: fullName,
      role: 'ordinary',
      avatar: '',
    },
  ]);

  if (error) throw new Error(error.message);

  return data;
}

export async function signup({ fullName, email, password }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) throw new Error(error.message);

  await createUserInDatabase(data.user.id, fullName);

  return data;
}

export async function login({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);

  return data;
}

// Fetch the current user and their details from the 'users' table
export async function getCurrentUser() {
  // Fetch the current session
  const {
    data: { session },
    error: sessionError,
  } = await supabase.auth.getSession();

  if (sessionError || !session?.user) {
    throw new Error('Could not fetch session');
  }

  const userId = session.user.id;

  // Fetch user details from the 'users' table using the user ID
  const { data: userDetails, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', userId)
    .single(); // Fetch a single user record

  if (error) {
    throw new Error(error.message);
  }

  return userDetails;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
}

export async function updateCurrentUser({ password, fullName, avatar }) {
  const {
    data: { user },
    error: sessionError,
  } = await supabase.auth.getUser();

  if (sessionError || !user) throw new Error('User not authenticated');

  const userId = user.id;

  // Update authentication details if password is provided
  if (password) {
    const { error: authError } = await supabase.auth.updateUser({ password });
    if (authError) throw new Error(authError.message);
  }

  // Update full name in the 'users' table
  if (fullName) {
    const { error: profileError } = await supabase
      .from('users')
      .update({ full_name: fullName })
      .eq('id', userId);

    if (profileError) throw new Error(profileError.message);
  }

  // Handle avatar upload
  let avatarUrl;
  if (avatar) {
    const fileName = `avatar-${userId}-${Math.random()}`;
    const { error: storageError } = await supabase.storage
      .from('avatars')
      .upload(fileName, avatar);

    if (storageError) throw new Error(storageError.message);

    avatarUrl = `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`;

    const { error: updateAvatarError } = await supabase
      .from('users')
      .update({ avatar: avatarUrl })
      .eq('id', userId);

    if (updateAvatarError) throw new Error(updateAvatarError.message);
  }

  // Fetch and return the updated user details from the 'users' table
  const { data: updatedUser, error: fetchUserError } = await supabase
    .from('users')
    .select('*')
    .eq('id', userId)
    .single();

  if (fetchUserError) throw new Error(fetchUserError.message);

  return updatedUser;
}

export async function fetchAllUsers() {
  const { data, error } = await supabase.from('users').select('*');

  if (error) throw new Error(error.message);

  return data;
}
