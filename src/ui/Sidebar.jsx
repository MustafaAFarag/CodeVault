import { useEffect, useRef } from 'react';
import { animate } from 'motion';
import Logo from './Logo';
import MainNav from './MainNav';

function Sidebar() {
  const sidebarRef = useRef(null);

  useEffect(() => {
    animate(
      sidebarRef.current,
      { opacity: [0, 1], transform: ['translateX(-100px)', 'translateX(0)'] },
      { duration: 0.5 },
    );
  }, []);

  return (
    <aside
      ref={sidebarRef}
      className="row-span-full flex h-full w-48 flex-col gap-8 border-r border-solid border-border bg-teal-100 p-4 text-gray-800 md:w-60 md:p-6 lg:w-72"
    >
      <Logo height={110} width={90} />
      <MainNav />
    </aside>
  );
}

export default Sidebar;
