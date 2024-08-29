import { fetchFavorites, removeFavorite } from '../services/apiFavoritesFav';
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
      <div className="py-6 text-center text-gray-500">
        <p>Loading...</p>
      </div>
    );
  }

  if (error || subjectsError) {
    return (
      <div className="py-6 text-center text-red-500">
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
    <div className="min-h-screen bg-gray-100 p-6">
      <SubjectDropdown
        subjects={subjectsData}
        onChange={handleSubjectChange}
        title="-- All Bookmarks --"
        className="mb-6"
      />
      <div className="mb-6 flex items-center rounded-lg bg-white p-6 shadow-md">
        <FaBookmark className="mr-2 text-accent" size={24} />
        <h1 className="text-3xl font-bold text-gray-800">Your Favorites</h1>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredFavorites.length > 0 ? (
          filteredFavorites.map((favorite) => (
            <div
              key={favorite.id}
              className="relative rounded-lg bg-white p-4 shadow-md transition-shadow hover:shadow-lg"
            >
              <div className="absolute right-2 top-2">
                <button
                  onClick={() => handleRemoveFavorite(favorite.id)}
                  className="text-accent transition-colors hover:text-secondary"
                >
                  <FaHeart size={24} />
                </button>
              </div>
              <div className="text-lg font-semibold text-gray-900">
                {favorite.notes.title}
              </div>
              <p className="mt-2 text-gray-600">{favorite.notes.description}</p>
              <p className="mt-1 text-sm text-gray-500">
                Subject: {favorite.notes.subjects.name}
              </p>
              <a
                href={favorite.notes.pdf_url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 block text-accent hover:underline"
              >
                View PDF
              </a>
            </div>
          ))
        ) : (
          <div className="mt-10 text-center text-gray-500">
            <p>You have no favorite notes yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Favorites;
