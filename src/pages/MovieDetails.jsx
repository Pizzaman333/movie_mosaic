import { useEffect, useState, useRef, Suspense } from "react";
import {
  useParams,
  Link,
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { getMovieDetails } from "../services/tmdb-api";
import styles from "../styles/MovieDetails.module.scss";

const MovieDetails = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  const backLinkLocationRef = useRef(location.state?.from ?? "/movies");

  useEffect(() => {
    getMovieDetails(movieId).then(setMovie);
  }, [movieId]);

  if (!movie) return null;

  const { title, release_date, vote_average, overview, genres, poster_path } =
    movie;
  const userScore = Math.round(vote_average * 10);

  return (
    <div className={styles.detailsContainer}>
      <button
        onClick={() => navigate(backLinkLocationRef.current)}
        className={styles.backButton}
      >
        &#8592; Go back
      </button>

      <div className={styles.hero}>
        <img
          src={
            poster_path
              ? `https://image.tmdb.org/t/p/w500/${poster_path}`
              : "https://via.placeholder.com/500x750"
          }
          alt={title}
          className={styles.poster}
        />
        <div className={styles.info}>
          <h2>
            {title} ({parseInt(release_date)})
          </h2>
          <p>User Score: {userScore}%</p>
          <h3>Overview</h3>
          <p>{overview}</p>
          <h3>Genres</h3>
          <p>{genres.map((g) => g.name).join(", ")}</p>
        </div>
      </div>

      <div className={styles.additionalInfo}>
        <h3>Additional Information</h3>
        <ul>
          <li>
            <Link to="cast">Cast</Link>
          </li>
          <li>
            <Link to="reviews">Reviews</Link>
          </li>
        </ul>
      </div>

      <div className={styles.nestedRoutes}>
        <Suspense fallback={<div>Loading details...</div>}>
          <Outlet />
        </Suspense>
      </div>
    </div>
  );
};

export default MovieDetails;
