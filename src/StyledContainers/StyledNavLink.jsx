/* eslint-disable react/prop-types */
import { NavLink } from 'react-router-dom';

function StyledNavLink({ children, to }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => `
        flex items-center gap-3 
        ${isActive ? 'text-white bg-gray-800' : 'text-gray-300'}
        hover:text-white 
        transition-all duration-300 
        hover:bg-gray-700 
        p-2 rounded-md
      `}
    >
      {children}
    </NavLink>
  );
}

export default StyledNavLink;
