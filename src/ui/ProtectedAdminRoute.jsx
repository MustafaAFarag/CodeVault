// src/ui/ProtectAdminRoute.jsx
import { useUser } from '../features/authentication/useUser';
import { Navigate, Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

const ProtectAdminRoute = () => {
  const { user } = useUser();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check user role and loading state
    if (user) {
      if (user.role === 'admin' || user.role === 'super_admin') {
        setIsLoading(false);
      } else {
        toast.error(
          'Access denied: You do not have the necessary permissions.',
        );
        setIsLoading(false);
      }
    } else {
      // If user is not logged in
      toast.error('You need to be logged in to access this page.');
      setIsLoading(false);
    }
  }, [user]);

  if (isLoading) {
    return <div>Loading...</div>; // You can customize this loading indicator
  }

  return user && (user.role === 'admin' || user.role === 'super_admin') ? (
    <Outlet />
  ) : (
    <Navigate to="/dashboard" />
  );
};

export default ProtectAdminRoute;
