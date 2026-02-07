import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieCredits } from "../services/tmdb-api";
import styles from "../styles/Cast.module.scss";

const Cast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);

  useEffect(() => {
    getMovieCredits(movieId).then((data) => setCast(data.cast));
  }, [movieId]);

  return (
    <ul className={styles.castList}>
      {cast.map(({ id, name, character }) => (
        <li key={id} className={styles.castItem}>
          <strong className={styles.castName}>{name}</strong> as{" "}
          <span className={styles.castCharacter}>{character}</span>
        </li>
      ))}
    </ul>
  );
};

export default Cast;
