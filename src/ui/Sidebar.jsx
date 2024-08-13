import Logo from './Logo';
import MainNav from './MainNav';

function Sidebar() {
  return (
    <aside className="bg-background py-4 px-4 border-r-2 border-solid border-gray-700 row-span-full flex flex-col gap-[3.2rem] h-full duration-300 transition-all text-white">
      <Logo />
      <MainNav />
    </aside>
  );
}

export default Sidebar;
