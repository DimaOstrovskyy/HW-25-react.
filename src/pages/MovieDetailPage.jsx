import { useEffect, useState } from "react";
import { Link, Outlet, useNavigate, useParams } from "react-router-dom";
import { getMovieDetailById } from "../api/moviesApi";
import Loader from "../components/Loader";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

const MovieDetailPage = () => {
  const { movieId } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getMovieDetailById(movieId);
        setMovie(data);
      } catch (err) {
        setError(err.message || "Не вдалося завантажити фільм");
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [movieId]);

  if (loading) return <Loader />;
  if (error) return <p className="p-6 text-center text-red-500">{error}</p>;
  if (!movie) return null;

  return (
    <div className="container mx-auto p-6">
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="mb-6 rounded bg-gray-700 px-4 py-2 text-white hover:bg-gray-600"
      >
        ← Назад
      </button>

      <div className="flex flex-col gap-8 md:flex-row">
        {movie.poster_path && (
          <img
            src={`${IMAGE_BASE_URL}${movie.poster_path}`}
            alt={movie.title}
            className="w-full max-w-sm rounded-lg object-cover"
          />
        )}
        <div>
          <h1 className="mb-4 text-3xl font-bold text-white">{movie.title}</h1>
          <p className="mb-4 text-gray-300">{movie.overview || "Опис відсутній."}</p>
          <p className="mb-2 text-gray-400">
            Рейтинг: {movie.vote_average?.toFixed(1) || "—"}
          </p>
          <p className="mb-6 text-gray-400">
            Рік: {movie.release_date?.slice(0, 4) || "—"}
          </p>

          <div className="flex gap-4 border-b border-gray-700 pb-4">
            <Link
              to="cast"
              className="font-semibold text-yellow-400 hover:text-yellow-300"
            >
              Акторський склад
            </Link>
            <Link
              to="reviews"
              className="font-semibold text-yellow-400 hover:text-yellow-300"
            >
              Відгуки
            </Link>
          </div>
        </div>
      </div>

      <Outlet />
    </div>
  );
};

MovieDetailPage.propTypes = {};

export default MovieDetailPage;
