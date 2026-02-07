import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { searchMovies } from "../services/tmdb-api";
import styles from "../styles/Movies.module.scss";

const Movies = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [movies, setMovies] = useState([]);
  const query = searchParams.get("query") ?? "";

  useEffect(() => {
    if (!query) return;

    searchMovies(query).then((data) => {
      setMovies(data.results);
    });
  }, [query]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    setSearchParams({ query: form.elements.query.value });
    form.reset();
  };

  return (
    <main className={styles.container}>
      <form className={styles.searchForm} onSubmit={handleSubmit}>
        <input name="query" type="text" placeholder="Search surfing films..." />
        <button type="submit">Search</button>
      </form>

      <ul className={styles.movieGrid}>
        {movies.map((movie) => (
          <li key={movie.id} className={styles.card}>
            <Link
              to={`/movies/${movie.id}`}
              state={{ from: `/movies?query=${query}` }}
            >
              <img
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w300/${movie.poster_path}`
                    : "https://via.placeholder.com/300x450"
                }
                alt={movie.title}
              />
              <p>{movie.title}</p>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
};

export default Movies;
