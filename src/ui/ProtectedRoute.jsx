/* eslint-disable react/prop-types */
import { useNavigate } from 'react-router-dom';
import { useUser } from '../features/authentication/useUser';
import Spinner from './Spinner';
import { useEffect } from 'react';

function ProtectedRoute({ children }) {
  const navigate = useNavigate();

  // 1. Load the autenticated User
  const { isLoading, isAuthenticated } = useUser();

  // 2. if there is no authenticated user , redirect to /login
  useEffect(
    function () {
      if (!isAuthenticated && !isLoading) navigate('/login');
    },
    [isAuthenticated, isLoading, navigate],
  );

  // 3. While Loading show a Spinner
  if (isLoading)
    return (
      <div className="flex h-screen items-center justify-center">
        <Spinner />
      </div>
    );

  // 4. if there is a user , render the app

  if (isAuthenticated) return children;
}

export default ProtectedRoute;
