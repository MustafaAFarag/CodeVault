/* eslint-disable react/prop-types */
import { NavLink } from 'react-router-dom';

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
      <div className="flex items-center gap-3">{children}</div>
    </NavLink>
  );
}

export default StyledNavLink;
