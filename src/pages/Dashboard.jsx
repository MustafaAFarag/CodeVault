import { useUser } from '../features/authentication/useUser';
import Spinner from '../ui/Spinner';

function Dashboard() {
  const { isLoading: userLoading, user } = useUser();

  if (userLoading) return <Spinner />;
  return <div>Welcome {user?.full_name}!</div>;
}

export default Dashboard;
