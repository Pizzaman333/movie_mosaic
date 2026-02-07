const API_KEY = '98cc2b97adcabb4fc91c9645937b7245';
const BASE_URL = 'https://api.themoviedb.org/3';

export const getTrendingMovies = () => 
  fetch(`${BASE_URL}/trending/movie/day?api_key=${API_KEY}`).then(res => res.json());

export const searchMovies = (query) => 
  fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`).then(res => res.json());

export const getMovieDetails = (id) => 
  fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`).then(res => res.json());

export const getMovieCredits = (id) => 
  fetch(`${BASE_URL}/movie/${id}/credits?api_key=${API_KEY}`).then(res => res.json());

export const getMovieReviews = (id) => 
  fetch(`${BASE_URL}/movie/${id}/reviews?api_key=${API_KEY}`).then(res => res.json());