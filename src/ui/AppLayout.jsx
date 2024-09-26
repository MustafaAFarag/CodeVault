import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';

function AppLayout() {
  return (
    <div className="grid h-screen grid-cols-[auto,1fr] grid-rows-[auto,1fr]">
      <Sidebar />
      <Header />
      <main className="col-start-2 row-start-2 overflow-auto bg-gray-200 px-4 pb-6 pt-4 md:px-6 md:pb-8 md:pt-6 lg:px-8 lg:pb-10 lg:pt-8">
        <div className="mx-auto flex max-w-full flex-col gap-4 rounded-lg bg-white p-4 shadow-md md:p-6 lg:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default AppLayout;
