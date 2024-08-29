import { Outlet } from 'react-router-dom';
import HomeHeader from './HomeHeader';

function HomeLayout() {
  return (
    <div className="relative flex min-h-screen flex-col">
      <HomeHeader />
      <Outlet />
    </div>
  );
}

export default HomeLayout;
