import { useState, useMemo } from 'react';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { useUser } from '../features/authentication/useUser';
import SubjectDropdown from '../features/Sheets/SubjectDropdown';
import { fetchSubjects } from '../services/apiNotes';
import { fetchFavorites, removeFavorite } from '../services/apiFavoritesFav';
import { FaHeart } from 'react-icons/fa';
import { Paginator } from 'primereact/paginator';
import { toast } from 'react-hot-toast';
import { useSelectedSubject } from '../features/Notes/useSelectedSubject';

function Favorites() {
  const { user } = useUser();
  const { selectedSubject, handleSubjectChange } = useSelectedSubject();
  const queryClient = useQueryClient();

  const [pagination, setPagination] = useState({
    first: 0,
    rows: 6,
  });

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

  const filteredFavorites = useMemo(() => {
    return favorites.filter((favorite) => {
      return (
        !selectedSubject ||
        favorite.notes.subjects.id === parseInt(selectedSubject, 10)
      );
    });
  }, [favorites, selectedSubject]);

  const totalRecords = filteredFavorites.length;
  const favoritesToDisplay = filteredFavorites.slice(
    pagination.first,
    pagination.first + pagination.rows,
  );

  const handlePageChange = (event) => {
    setPagination({
      first: event.first,
      rows: event.rows,
    });
  };

  if (isLoading || subjectsLoading) return <p>Loading...</p>;
  if (error || subjectsError) return <p>Error...</p>;

  return (
    <div className="h-full bg-gray-50 p-4 md:p-8 lg:h-[650px]">
      <h1 className="mb-6 mt-10 text-center text-3xl font-bold text-teal-600 sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
        Your Favorites
      </h1>

      <div className="mb-8 flex flex-col items-center justify-between md:flex-row">
        <SubjectDropdown
          subjects={subjectsData}
          onChange={handleSubjectChange}
          title="All Bookmarks"
        />
      </div>

      <div className="grid grid-cols-1 gap-6 bg-white p-6 md:grid-cols-2 lg:grid-cols-3">
        {favoritesToDisplay.length > 0 ? (
          favoritesToDisplay.map((favorite) => (
            <div
              key={favorite.id}
              className="relative flex flex-col rounded-lg border border-gray-200 bg-white p-4 shadow-md transition-shadow hover:shadow-lg"
            >
              <div className="absolute right-2 top-2">
                <button
                  onClick={() => handleRemoveFavorite(favorite.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <FaHeart size={14} />
                </button>
              </div>
              <h2 className="mb-2 text-lg font-semibold text-teal-600 lg:text-2xl">
                {favorite.notes.title}
              </h2>
              <p className="md:text-md mb-2 text-sm text-gray-600 lg:text-xl">
                {favorite.notes.description}
              </p>
              <p className="mb-4 text-sm text-gray-500 lg:text-xl">
                Subject: {favorite.notes.subjects.name}
              </p>
              <a
                href={favorite.notes.pdf_url}
                target="_blank"
                rel="noopener noreferrer"
                className="mb-5 mt-auto block rounded-lg bg-secondary px-3 py-2 text-center text-sm font-semibold text-text transition-all duration-300 hover:bg-accent md:px-5 md:py-3 lg:text-xl"
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
      <Paginator
        first={pagination.first}
        rows={pagination.rows}
        totalRecords={totalRecords}
        onPageChange={handlePageChange}
        className="p-2 text-xl"
        template="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink"
        leftContent={
          <span className="font-bold">
            {Math.floor(pagination.first / pagination.rows) + 1} of{' '}
            {Math.ceil(totalRecords / pagination.rows)}
          </span>
        }
      />
    </div>
  );
}

export default Favorites;
