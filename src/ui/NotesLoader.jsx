import { Skeleton } from 'primereact/skeleton';

const NotesLoader = () => {
  return (
    <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="rounded-lg border border-gray-300 bg-white p-4 shadow-md"
        >
          <div className="mb-4 flex items-center justify-between">
            <Skeleton width="70%" height="20px" />
            <Skeleton shape="circle" size="24px" />
          </div>
          <Skeleton width="100%" height="150px" className="mb-4" />
          <Skeleton width="60%" height="20px" className="mb-2" />
          <Skeleton width="80%" height="20px" />
        </div>
      ))}
    </div>
  );
};

export default NotesLoader;
