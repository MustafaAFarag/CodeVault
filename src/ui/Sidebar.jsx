import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import Logo from './Logo';
import MainNav from './MainNav';
import { Link } from 'react-router-dom';
import { Button } from 'primereact/button';

function Sidebar() {
  return (
    <motion.aside
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="col-start-1 row-span-full flex h-screen w-48 flex-col justify-between gap-8 overflow-auto border-r border-solid border-border bg-gradient-to-b from-teal-100 to-teal-300 p-4 text-gray-800 md:w-60 md:p-6 lg:w-72"
    >
      {/* Top Section: Logo and Navigation */}
      <div className="flex flex-col gap-8">
        <Logo height={110} width={90} />
        <MainNav />
      </div>

      {/* Bottom Section: Social Media Icons */}
      <div className="flex flex-col gap-10">
        <div className="flex flex-col items-center justify-center gap-4 rounded-lg bg-gray-800 p-3 shadow-lg md:p-4">
          <Link to="/rules">
            <Button
              label="Rules and Permissions!"
              className="w-full rounded-full bg-transparent text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl md:text-base"
            />
          </Link>
        </div>

        <div className="flex items-center justify-center gap-4 rounded-lg bg-gray-800 p-3 shadow-lg md:p-4">
          <a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=mustafa.ashraf.saad@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-teal-300 hover:text-teal-100"
          >
            <FaEnvelope size={24} />
          </a>
          <a
            href="https://github.com/MustafaAFarag/EduData"
            target="_blank"
            rel="noopener noreferrer"
            className="text-teal-300 hover:text-teal-100"
          >
            <FaGithub size={24} />
          </a>
          <a
            href="https://www.linkedin.com/in/mustafaashrafsaad/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-teal-300 hover:text-teal-100"
          >
            <FaLinkedin size={24} />
          </a>
        </div>
      </div>
    </motion.aside>
  );
}

export default Sidebar;
