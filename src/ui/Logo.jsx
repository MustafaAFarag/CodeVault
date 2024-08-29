/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect, useRef } from 'react';
import { animate } from 'motion';
import LogoLink from './LogoLink';

function Logo({ children, width, height, className }) {
  const logoRef = useRef(null);

  useEffect(() => {
    animate(
      logoRef.current,
      { transform: ['scale(1)', 'scale(1.3)', 'scale(1)'] },
      { duration: 2, loop: Infinity },
    );
  }, []);

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <LogoLink to="/">
        <img
          alt="EduData Logo"
          loading="lazy"
          src="./Logo.png"
          width={width}
          height={height}
          ref={logoRef}
        />
        <span className="ml-3 text-3xl font-bold text-accent transition-all duration-300 hover:text-accent md:text-4xl">
          {children}
        </span>
      </LogoLink>
    </div>
  );
}

export default Logo;
