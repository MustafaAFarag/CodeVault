import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';

function AppLayout() {
  return (
    <div className="grid h-screen grid-cols-[12rem,1fr] grid-rows-[auto,1fr] bg-gray-50 md:grid-cols-[15rem,1fr] lg:grid-cols-[18rem,1fr]">
      <Sidebar />
      <Header />
      <main className="col-start-2 row-start-2 bg-gray-200 px-[4.8rem] pb-[6.4rem] pt-[4rem]">
        <div className="mx-auto flex max-w-[120rem] flex-col gap-[3.2rem] bg-white lg:my-10">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default AppLayout;
