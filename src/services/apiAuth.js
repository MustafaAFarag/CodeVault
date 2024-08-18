import supabase from './supabase';

// Function to create a new user in the 'users' table after signing up
async function createUserInDatabase(userId, fullName) {
  const { data, error } = await supabase.from('users').insert([
    {
      id: userId,
      full_name: fullName,
      role: 'ordinary', // Default role, change as needed
    },
  ]);

  if (error) throw new Error(error.message);

  return data;
}

export async function signup({ fullName, email, password }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        avatar: '',
      },
    },
  });

  if (error) throw new Error(error.message);

  // Create user in the new users table
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
