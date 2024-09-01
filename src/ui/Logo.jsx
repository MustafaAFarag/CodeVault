/* eslint-disable react/prop-types */
import { motion } from 'framer-motion';
import LogoLink from './LogoLink';

function Logo({ children, width, height, className }) {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <LogoLink to="/">
        <motion.img
          alt="EduData Logo"
          loading="lazy"
          src="./Logo.png"
          width={width}
          height={height}
          initial={{ scale: 1 }}
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 1 }}
        />
        <span className="ml-3 text-3xl font-bold text-accent transition-all duration-300 hover:text-accent md:text-4xl">
          {children}
        </span>
      </LogoLink>
    </div>
  );
}

export default Logo;
