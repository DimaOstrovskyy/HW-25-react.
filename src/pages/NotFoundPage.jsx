import { Link } from "react-router-dom";

const NotFoundPage = () => (
  <div className="flex min-h-[70vh] flex-col items-center justify-center p-6 text-center">
    <h1 className="mb-4 text-5xl font-bold text-white">404</h1>
    <p className="mb-6 text-xl text-gray-400">Сторінку не знайдено</p>
    <Link
      to="/"
      className="rounded bg-yellow-500 px-5 py-2 font-bold text-gray-900 hover:bg-yellow-400"
    >
      На головну
    </Link>
  </div>
);

NotFoundPage.propTypes = {};

export default NotFoundPage;
