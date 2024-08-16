import { Outlet } from 'react-router-dom';
import HomeHeader from './HomeHeader';

function HomeLayout() {
  return (
    <div className="flex flex-col min-h-screen relative">
      <HomeHeader />
      <main className="">
        <Outlet />
      </main>
    </div>
  );
}

export default HomeLayout;
