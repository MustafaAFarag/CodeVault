import { fetchFavorites } from '../services/apiFavorites';
import { FaBookmark } from 'react-icons/fa';
import { useQuery } from '@tanstack/react-query';
import { useUser } from '../features/authentication/useUser';
import SubjectDropdown from '../features/Sheets/SubjectDropdown';
import { fetchSubjects } from '../services/apiNotes';
import { useSelectedSubject } from '../features/Notes/useSelectedSubject';

function Favorites() {
  const { user } = useUser();
  const { selectedSubject, handleSubjectChange } = useSelectedSubject();

  const {
    data: subjectsData = [],
    error: subjectsError,
    isLoading: subjectsLoading,
  } = useQuery({
    queryKey: ['subjects'],
    queryFn: fetchSubjects,
  });

  const {
    data: favorites = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ['favorites', user?.id],
    queryFn: () => fetchFavorites(user.id),
    enabled: !!user?.id,
  });

  if (isLoading || subjectsLoading) {
    return (
      <div className="text-center text-gray-500 py-6">
        <p>Loading...</p>
      </div>
    );
  }

  if (error || subjectsError) {
    return (
      <div className="text-center text-red-500 py-6">
        <p>Failed to load data</p>
      </div>
    );
  }

  console.log('Favorites:', favorites);
  console.log('Selected Subject:', selectedSubject);

  const filteredFavorites = favorites.filter((favorite) => {
    console.log('Favorite subject ID:', favorite.notes.subjects.id);
    console.log('Selected subject:', selectedSubject);
    return (
      !selectedSubject ||
      favorite.notes.subjects.id === parseInt(selectedSubject, 10)
    );
  });

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <SubjectDropdown
        subjects={subjectsData}
        onChange={handleSubjectChange}
        title="-- All Bookmarks --"
        className="mb-6"
      />
      <div className="bg-white shadow-md rounded-lg p-6 mb-6 flex items-center">
        <FaBookmark className="text-accent mr-2" size={24} />
        <h1 className="text-3xl font-bold text-gray-800">Your Favorites</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredFavorites.length > 0 ? (
          filteredFavorites.map((favorite) => (
            <div
              key={favorite.id}
              className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow"
            >
              <div className="text-lg font-semibold text-gray-900">
                {favorite.notes.title}
              </div>
              <p className="text-gray-600 mt-2">{favorite.notes.description}</p>
              <p className="text-gray-500 text-sm mt-1">
                Subject: {favorite.notes.subjects.name}
              </p>
              <a
                href={favorite.notes.pdf_url}
                target="_blank"
                rel="noopener noreferrer"
                className="block mt-4 text-accent hover:underline"
              >
                View PDF
              </a>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500 mt-10">
            <p>You have no favorite notes yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Favorites;
