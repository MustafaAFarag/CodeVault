import supabase, { supabaseUrl } from './supabase';
import { addLog } from './apiLogs';

// Function to create a new user in the 'users' table after signing up
async function createUserInDatabase(userId, fullName, email) {
  const { data, error } = await supabase.from('users').insert([
    {
      id: userId,
      full_name: fullName,
      email: email,
      role: 'basic',
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

  await createUserInDatabase(data.user.id, fullName, email);

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
  const {
    data: { session },
    error: sessionError,
  } = await supabase.auth.getSession();

  if (sessionError || !session?.user) {
    throw new Error('Could not fetch session');
  }

  const userId = session.user.id;

  const { data: userDetails, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', userId)
    .single();

  if (error) throw new Error(error.message);

  if (userDetails.suspended) {
    throw new Error('Your account has been suspended.');
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

export async function updateUserRole({ userId, newRole, adminId }) {
  // Validate the new role
  const validRoles = ['basic', 'verified', 'admin'];
  if (!validRoles.includes(newRole)) {
    throw new Error('Invalid role');
  }

  // Fetch the current role of the user
  const { data: currentUser, error: fetchError } = await supabase
    .from('users')
    .select('role')
    .eq('id', userId)
    .single();

  if (fetchError) throw new Error(fetchError.message);

  const currentRole = currentUser.role;

  // Super admin can promote to admin, while admin cannot promote to super_admin
  if (currentRole === 'admin' && newRole === 'super_admin') {
    throw new Error('Admins cannot promote to super_admin');
  }

  // Check if the admin making the change has sufficient permissions
  const { data: adminData, error: adminFetchError } = await supabase
    .from('users')
    .select('role')
    .eq('id', adminId)
    .single();

  if (adminFetchError) throw new Error(adminFetchError.message);

  const adminRole = adminData.role;

  if (newRole === 'admin' && adminRole !== 'super_admin') {
    throw new Error('Insufficient permissions');
  }

  // Update the user's role
  const { data, error } = await supabase
    .from('users')
    .update({ role: newRole })
    .eq('id', userId);

  if (error) throw new Error(error.message);

  // Log the role change action
  await addLog('Role Change', adminId); // Add a log entry for the action

  return data;
}

export async function suspendUser({ userId, isSuspended, adminId }) {
  if (typeof userId !== 'string') {
    throw new Error('Invalid user ID type.');
  }

  const { data, error } = await supabase
    .from('users')
    .update({ suspended: isSuspended })
    .eq('id', userId) // Ensure this ID is a valid string
    .select('*')
    .single();

  if (error) {
    console.error('Full error object:', error);
    throw new Error(error.message);
  }

  console.log('Updated user data:', data);

  await addLog(isSuspended ? 'User Suspended' : 'User Unsuspended', adminId);
  return data;
}
