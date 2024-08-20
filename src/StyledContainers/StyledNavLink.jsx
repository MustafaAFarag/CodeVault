/* eslint-disable react/prop-types */
import { NavLink } from 'react-router-dom';

function StyledNavLink({ children, to }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => `
        flex items-center gap-3 
        ${isActive ? 'text-secondary bg-background-secondary' : 'text-primary'}
        hover:text-secondary
        transition-all duration-300 
        hover:bg-background-secondary
        p-2 rounded-md
      `}
    >
      {children}
    </NavLink>
  );
}

export default StyledNavLink;
