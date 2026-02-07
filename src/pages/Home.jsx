import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { getTrendingMovies } from "../services/tmdb-api";
import styles from "../styles/Home.module.scss";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const location = useLocation();

  useEffect(() => {
    getTrendingMovies().then((data) => setMovies(data.results));
  }, []);

  return (
    <main className={styles.home}>
      <h1>Trending Today</h1>
      <ul className={styles.list}>
        {movies.map((movie) => (
          <li key={movie.id} className={styles.card}>
            <Link to={`/movies/${movie.id}`} state={{ from: location }}>
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

export default Home;
