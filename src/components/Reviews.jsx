import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieReviews } from "../services/tmdb-api";
import styles from "../styles/Reviews.module.scss";

const Reviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    getMovieReviews(movieId).then((data) => setReviews(data.results));
  }, [movieId]);

  if (reviews.length === 0) {
    return (
      <p className={styles.noReviews}>
        We don't have any reviews for this movie yet.
      </p>
    );
  }

  return (
    <ul className={styles.reviewList}>
      {reviews.map((review) => (
        <li key={review.id} className={styles.reviewItem}>
          <h4 className={styles.reviewAuthor}>Author: {review.author}</h4>
          <p className={styles.reviewContent}>{review.content}</p>
        </li>
      ))}
    </ul>
  );
};

export default Reviews;
