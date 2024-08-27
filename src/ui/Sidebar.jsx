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
      className="p-4 border-r border-solid border-border row-span-full flex flex-col gap-8 h-full w-80 bg-teal-100 text-gray-800"
    >
      <Logo height={110} width={90} />
      <MainNav />
    </aside>
  );
}

export default Sidebar;
