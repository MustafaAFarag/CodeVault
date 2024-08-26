import Logo from './Logo';
import MainNav from './MainNav';

function Sidebar() {
  return (
    <aside className=" py-4 px-4 border-r border-solid border-border row-span-full flex flex-col gap-8 h-full leading-3 duration-300 transition-all">
      <Logo height={110} width={90} />
      <MainNav />
    </aside>
  );
}

export default Sidebar;
