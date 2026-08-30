import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieReviews } from "../../api/moviesApi";
import Loader from "../../components/Loader";

const Reviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const data = await getMovieReviews(movieId);
        setReviews(data.results || []);
      } catch (err) {
        setError(err.message || "Не вдалося завантажити відгуки");
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, [movieId]);

  if (loading) return <Loader />;
  if (error) return <p className="mt-8 text-red-500">{error}</p>;

  return (
    <section className="mt-10">
      <h2 className="mb-6 text-2xl font-bold">Відгуки</h2>
      {reviews.length === 0 ? (
        <p className="text-gray-400">Відгуків поки немає.</p>
      ) : (
        <div className="space-y-6">
          {reviews.map((review) => (
            <article key={review.id} className="rounded-lg bg-gray-800 p-5">
              <h3 className="mb-3 font-bold text-yellow-400">
                {review.author}
              </h3>
              <p className="whitespace-pre-line text-gray-300">
                {review.content}
              </p>
            </article>
          ))}
        </div>
      )}
    </section>
  );
};

Reviews.propTypes = {};

export default Reviews;
