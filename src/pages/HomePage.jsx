import { useEffect, useState } from "react";
import { getTrendingMovies } from "../api/moviesApi";
import Loader from "../components/Loader";
import MovieCard from "../components/MovieCard";

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setError(null);
        const data = await getTrendingMovies();
        setMovies(data.results || []);
      } catch (err) {
        setError(err.message || "Не вдалося завантажити фільми");
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h1 className="mb-8 text-3xl font-bold text-white">
        Популярні фільми сьогодні
      </h1>
      {loading && <Loader />}
      {error && <p className="text-center text-xl text-red-500">{error}</p>}
      {!loading && !error && (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
};

HomePage.propTypes = {};

export default HomePage;
