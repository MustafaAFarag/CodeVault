/* eslint-disable react/prop-types */
import { Button } from 'primereact/button';
import { Link } from 'react-router-dom';

function LinkButton({ to, label }) {
  return (
    <Link to={to}>
      <Button
        label={label}
        className="px-6 py-3 md:px-8 md:py-4 bg-secondary rounded-full font-semibold text-lg md:text-3xl text-text hover:bg-accent transition-all duration-300 shadow-lg"
      />
    </Link>
  );
}

export default LinkButton;
