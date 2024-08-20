import Logo from './Logo';
import MainNav from './MainNav';

function Sidebar() {
  return (
    <aside className="bg-background-secondary py-4 px-4 border-r-2 border-solid border-border row-span-full flex flex-col gap-8 h-full duration-300 transition-all">
      <Logo />
      <MainNav />
    </aside>
  );
}

export default Sidebar;
