import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';

function AppLayout() {
  return (
    <div className="grid grid-cols-[20rem,1fr] grid-rows-[auto,1fr] bg-gray-50">
      <Sidebar />
      <Header />
      <main className="col-start-2 row-start-2 pt-[4rem] px-[4.8rem] pb-[6.4rem] bg-gray-200">
        <div className="flex flex-col gap-[3.2rem] my-0 mx-auto max-w-[120rem] bg-white">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default AppLayout;
