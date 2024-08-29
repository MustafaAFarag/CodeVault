/* eslint-disable react/prop-types */
import { NavLink } from 'react-router-dom';
import { animate } from 'motion';

function StyledNavLink({ children, to }) {
  const handleMouseEnter = (e) => {
    const icon = e.currentTarget.querySelector('svg');
    animate(icon, { scale: 1.2 }, { duration: 0.3 });
  };

  const handleMouseLeave = (e) => {
    const icon = e.currentTarget.querySelector('svg');
    animate(icon, { scale: 1 }, { duration: 0.3 });
  };

  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-3 ${isActive ? 'bg-accent text-text' : 'text-text'} rounded-md p-3 transition-all duration-300 hover:bg-accent`
      }
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </NavLink>
  );
}

export default StyledNavLink;
