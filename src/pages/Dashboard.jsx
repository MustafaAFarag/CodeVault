import { useUser } from '../features/authentication/useUser';
import Spinner from '../ui/Spinner';

function Dashboard() {
  const { isLoading: userLoading, user } = useUser();

  if (userLoading) return <Spinner />;
  return <div>Welcome {user?.user_metadata?.fullName}!</div>;
}

export default Dashboard;
