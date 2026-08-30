import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getMoviesBySearch } from "../api/moviesApi";
import Loader from "../components/Loader";
import MovieCard from "../components/MovieCard";

const MoviesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("query") || "");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const currentQuery = searchParams.get("query") || "";
    if (!currentQuery) {
      setMovies([]);
      setLoading(false);
      return;
    }

    const fetchMovies = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getMoviesBySearch(currentQuery);
        setMovies(data.results || []);
      } catch (err) {
        setError(err.message || "Не вдалося знайти фільми");
        setMovies([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [searchParams]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const trimmedQuery = query.trim();
    setSearchParams(trimmedQuery ? { query: trimmedQuery } : {});
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="mb-8 text-3xl font-bold text-white">Пошук фільмів</h1>
      <form className="mb-8 flex justify-center gap-4" onSubmit={handleSubmit}>
        <input
          className="w-full max-w-md rounded border border-gray-700 bg-gray-800 px-4 py-2 text-white focus:outline-none"
          placeholder="Введіть назву фільму..."
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          type="text"
        />
        <button
          className="rounded bg-yellow-500 px-6 py-2 font-bold text-gray-900 transition-colors hover:bg-yellow-400"
          type="submit"
        >
          Пошук
        </button>
      </form>
      {loading && <Loader />}
      {error && <p className="text-center text-xl text-red-500">{error}</p>}
      {!loading && !error && searchParams.get("query") && movies.length === 0 && (
        <p className="text-center text-xl text-gray-300">Фільмів не знайдено.</p>
      )}
      {!loading && !error && movies.length > 0 && (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
};

MoviesPage.propTypes = {};

export default MoviesPage;
