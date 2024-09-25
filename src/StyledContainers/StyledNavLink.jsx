/* eslint-disable react/prop-types */
import { NavLink } from 'react-router-dom';

function StyledNavLink({ children, to, disabled = false }) {
  return (
    <NavLink
      to={disabled ? '#' : to}
      className={({ isActive }) =>
        `flex items-center gap-3 rounded-md p-3 transition-all duration-300 ${disabled ? 'cursor-not-allowed opacity-50' : 'hover:bg-accent'} ${isActive && !disabled ? 'bg-accent text-text' : 'text-text'}`
      }
      onClick={(e) => disabled && e.preventDefault()} // Prevent clicks when disabled
    >
      <div className="flex items-center gap-3">{children}</div>
    </NavLink>
  );
}

export default StyledNavLink;
