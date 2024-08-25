/* eslint-disable react/prop-types */
import { useEffect, useRef } from 'react';
import { animate } from 'motion';
import LogoLink from './LogoLink';

function Logo({ children }) {
  const logoRef = useRef(null);

  useEffect(() => {
    animate(
      logoRef.current,
      { transform: ['scale(1)', 'scale(1.3)', 'scale(1)'] },
      { duration: 2, loop: Infinity },
    );
  }, []);

  return (
    <div className="flex items-center justify-center">
      <LogoLink to="/">
        <img
          alt="EduData Logo"
          loading="lazy"
          src="./Logo.png"
          width="90"
          height="90"
          ref={logoRef}
        />
        <span className="text-3xl md:text-4xl font-bold text-accent hover:text-accent transition-all duration-300 ml-3">
          {children}
        </span>
      </LogoLink>
    </div>
  );
}

export default Logo;
