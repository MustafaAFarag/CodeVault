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
      className={({ isActive }) => `
        flex items-center gap-3 
        ${isActive ? 'text-text bg-accent' : 'text-text'}
       
        transition-all duration-300 
        hover:bg-accent
        p-3 rounded-md
      `}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </NavLink>
  );
}

export default StyledNavLink;
