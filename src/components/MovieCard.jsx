import { Link } from "react-router-dom";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

const MovieCard = ({ movie }) => {
  const poster = movie.poster_path
    ? `${IMAGE_BASE_URL}${movie.poster_path}`
    : "https://via.placeholder.com/500x750?text=No+Poster";

  return (
    <article className="overflow-hidden rounded-lg bg-gray-800 shadow-lg transition-transform duration-300 hover:scale-105">
      <img
        src={poster}
        alt={movie.title}
        className="h-80 w-full object-cover"
        loading="lazy"
      />
      <div className="p-4">
        <h3 className="mb-2 line-clamp-2 text-lg font-bold text-white">
          {movie.title}
        </h3>
        <p className="mb-4 text-sm text-gray-400">
          Рік: {movie.release_date?.slice(0, 4) || "—"}
        </p>
        <Link
          to={`/movies/${movie.id}`}
          className="inline-block rounded bg-yellow-500 px-4 py-2 font-semibold text-gray-900 transition-colors hover:bg-yellow-400"
        >
          Детальніше
        </Link>
      </div>
    </article>
  );
};

MovieCard.propTypes = {
  movie: Object,
};

export default MovieCard;
