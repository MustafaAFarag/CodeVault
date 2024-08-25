import { fetchFavorites, removeFavorite } from '../services/apiFavorites';
import { FaBookmark, FaHeart } from 'react-icons/fa';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { useUser } from '../features/authentication/useUser';
import SubjectDropdown from '../features/Sheets/SubjectDropdown';
import { fetchSubjects } from '../services/apiNotes';
import { useSelectedSubject } from '../features/Notes/useSelectedSubject';
import { toast } from 'react-hot-toast';

function Favorites() {
  const { user } = useUser();
  const { selectedSubject, handleSubjectChange } = useSelectedSubject();
  const queryClient = useQueryClient();

  const removeFavoriteMutation = useMutation({
    mutationFn: removeFavorite,
    onSuccess: () => {
      queryClient.invalidateQueries(['favorites', user.id]);
      toast.success('Favorite removed successfully');
    },
    onError: (error) => {
      toast.error(`Error removing favorite: ${error.message}`);
    },
  });

  const handleRemoveFavorite = (favoriteId) => {
    removeFavoriteMutation.mutate(favoriteId);
  };

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

  const filteredFavorites = favorites.filter((favorite) => {
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
              className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow relative"
            >
              <div className="absolute top-2 right-2">
                <button
                  onClick={() => handleRemoveFavorite(favorite.id)}
                  className="text-accent hover:text-secondary transition-colors"
                >
                  <FaHeart size={24} />
                </button>
              </div>
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
