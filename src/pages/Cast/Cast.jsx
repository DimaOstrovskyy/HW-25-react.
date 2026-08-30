import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieCredits } from "../../api/moviesApi";
import Loader from "../../components/Loader";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w200";

const Cast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCast = async () => {
      try {
        const data = await getMovieCredits(movieId);
        setCast(data.cast || []);
      } catch (err) {
        setError(err.message || "Не вдалося завантажити акторський склад");
      } finally {
        setLoading(false);
      }
    };
    fetchCast();
  }, [movieId]);

  if (loading) return <Loader />;
  if (error) return <p className="mt-8 text-red-500">{error}</p>;

  return (
    <section className="mt-10">
      <h2 className="mb-6 text-2xl font-bold">Акторський склад</h2>
      <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-5">
        {cast.slice(0, 20).map((actor) => (
          <article key={actor.cast_id || actor.credit_id}>
            <img
              src={actor.profile_path ? `${IMAGE_BASE_URL}${actor.profile_path}` : "https://via.placeholder.com/200x300?text=No+Photo"}
              alt={actor.name}
              className="h-64 w-full rounded object-cover"
              loading="lazy"
            />
            <h3 className="mt-2 font-semibold">{actor.name}</h3>
            <p className="text-sm text-gray-400">{actor.character}</p>
          </article>
        ))}
      </div>
    </section>
  );
};

Cast.propTypes = {};

export default Cast;
