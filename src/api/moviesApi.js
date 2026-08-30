import axiosInstance from "./axiosInstance";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const request = async (url, params = {}) => {
  if (!API_KEY || API_KEY === "YOUR_TMDB_API_KEY") {
    throw new Error("Додай VITE_TMDB_API_KEY у файл .env");
  }

  const response = await axiosInstance.get(url, {
    params: {
      api_key: API_KEY,
      language: "uk-UA",
      ...params,
    },
  });

  return response.data;
};

export const getTrendingMovies = () => request("/trending/movie/day");

export const getMoviesBySearch = (searchTerm, page = 1) =>
  request("/search/movie", {
    query: searchTerm,
    page,
    include_adult: false,
  });

export const getMovieDetailById = (movieId) => request(`/movie/${movieId}`);

export const getMovieCredits = (movieId) => request(`/movie/${movieId}/credits`);

export const getMovieReviews = (movieId) => request(`/movie/${movieId}/reviews`);
