import { Skeleton } from 'primereact/skeleton';

const Spinner = () => {
  return (
    <div className="flex flex-col space-y-4 p-4">
      <Skeleton width="80%" height="10rem" />
      <Skeleton width="60%" height="10rem" />
      <Skeleton width="90%" height="10rem" borderRadius="8px" />
      <div className="grid w-full grid-cols-2 gap-4">
        <Skeleton width="100%" height="10rem" borderRadius="8px" />
        <Skeleton width="100%" height="10rem" borderRadius="8px" />
      </div>
    </div>
  );
};

export default Spinner;
