import { Skeleton } from 'primereact/skeleton';

const NotesLoader = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="p-4 bg-white rounded-lg shadow-md border border-gray-300"
        >
          <div className="flex justify-between items-center mb-4">
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
