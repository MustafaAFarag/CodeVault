/* eslint-disable react/prop-types */
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion'; // Import motion from framer-motion

function StyledNavLink({ children, to }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-3 ${
          isActive ? 'bg-accent text-text' : 'text-text'
        } rounded-md p-3 transition-all duration-300 hover:bg-accent`
      }
    >
      {/* Wrap children in motion.div to animate them */}
      <motion.div
        whileHover={{ scale: 1.2 }} // Scale up on hover
        whileTap={{ scale: 1 }} // Reset scale on tap
        transition={{ duration: 0.3 }} // Transition duration
        className="flex items-center gap-3"
      >
        {children}
      </motion.div>
    </NavLink>
  );
}

export default StyledNavLink;
