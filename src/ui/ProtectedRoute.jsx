/* eslint-disable react/prop-types */
import { useNavigate } from 'react-router-dom';
import { useUser } from '../features/authentication/useUser';
import FullPageSpinner from '../ui/FullPageSpinner';
import { useEffect } from 'react';

function ProtectedRoute({ children }) {
  const navigate = useNavigate();

  // 1. Load the autenticated User
  const { isLoading, isAuthenticated } = useUser();

  // 2. if there is no authenticated user , redirect to /signup
  useEffect(
    function () {
      if (!isAuthenticated && !isLoading) navigate('/signup');
    },
    [isAuthenticated, isLoading, navigate],
  );

  // 3. While Loading show a Spinner
  if (isLoading)
    return (
      <div className="flex h-screen items-center justify-center">
        <FullPageSpinner />
      </div>
    );

  // 4. if there is a user , render the app

  if (isAuthenticated) return children;
}

export default ProtectedRoute;
