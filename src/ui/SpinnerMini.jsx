import { BiLoaderAlt } from 'react-icons/bi';

function SpinnerMini() {
  return (
    <div className="flex h-full items-center justify-center">
      <BiLoaderAlt
        className="h-6 w-6 animate-spin"
        style={{ animation: 'spin 1.5s linear infinite' }}
      />
    </div>
  );
}

export default SpinnerMini;
