/* eslint-disable react/prop-types */
import { Button } from 'primereact/button';
import { Link } from 'react-router-dom';

function LinkButton({ to, label }) {
  return (
    <Link to={to}>
      <Button
        label={label}
        className="w-full rounded-full bg-secondary px-4 py-2 text-base font-semibold text-text shadow-lg transition-all duration-300 hover:bg-accent md:w-auto md:px-6 md:py-3 md:text-2xl lg:px-8 lg:py-4 lg:text-3xl"
      />
    </Link>
  );
}

export default LinkButton;
