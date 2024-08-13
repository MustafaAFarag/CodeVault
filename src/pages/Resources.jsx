import { fetchResources } from '../services/apiResources';
import { useQuery } from '@tanstack/react-query';
import Spinner from '../ui/Spinner';

function Resources() {
  const { data, error, isLoading } = useQuery({
    queryKey: ['resources'],
    queryFn: fetchResources,
  });

  if (isLoading) return <Spinner />;

  if (error)
    return <p className="text-center text-red-500">Error: {error.message}</p>;

  return (
    <div className="p-6 bg-gray-900 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold text-white">Resources</h1>
        <button className="bg-red-600 text-white font-semibold rounded-md px-4 py-2 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-opacity-50 transition-colors duration-300">
          Add Resource
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.resourcesData.length > 0 ? (
          data.resourcesData.map((resource, index) => (
            <div
              key={index}
              className="bg-gray-800 p-4 rounded-lg shadow-lg border border-gray-700 flex flex-col justify-between transition-shadow duration-300 hover:shadow-xl"
            >
              <h3 className="text-2xl font-semibold text-white mb-2">
                {resource.title}
              </h3>
              <p className="text-gray-400 mb-4">{resource.description}</p>
              <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-300 flex items-center justify-center ">
                Roadmap for {resource.title}
              </button>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-400">No resources found</p>
        )}
      </div>
    </div>
  );
}

export default Resources;
