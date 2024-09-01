import { motion } from 'framer-motion';
import Logo from './Logo';
import MainNav from './MainNav';

function Sidebar() {
  return (
    <motion.aside
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="col-start-1 row-span-full flex h-full w-48 flex-col gap-8 border-r border-solid border-border bg-teal-100 p-4 text-gray-800 md:w-60 md:p-6 lg:w-72"
    >
      <Logo height={110} width={90} />
      <MainNav />
    </motion.aside>
  );
}

export default Sidebar;
