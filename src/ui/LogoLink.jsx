/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';

function LogoLink({ to, children }) {
  return (
    <Link to={to} className=" z-50 flex items-center  ">
      {children}
    </Link>
  );
}

export default LogoLink;
