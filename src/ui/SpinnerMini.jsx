import { BiLoaderAlt } from 'react-icons/bi';

function SpinnerMini() {
  return (
    <div className="flex justify-center items-center h-full  ">
      <BiLoaderAlt
        className="w-6 h-6 animate-spin"
        style={{ animation: 'spin 1.5s linear infinite' }}
      />
    </div>
  );
}

export default SpinnerMini;
