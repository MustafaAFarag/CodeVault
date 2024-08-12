/* eslint-disable react/prop-types */
import { NavLink } from 'react-router-dom';

function StyledNavLink({ children, to }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => `
        flex items-center gap-3 
        ${isActive ? 'text-blue-700 bg-blue-100' : 'text-gray-700'}
        hover:text-blue-600 
        transition-all duration-300 
        hover:bg-blue-50 
        p-2 rounded-md
      `}
    >
      {children}
    </NavLink>
  );
}

export default StyledNavLink;
