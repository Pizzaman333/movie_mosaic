import { Outlet, NavLink } from "react-router-dom";
import { Suspense } from "react";
import styles from "../styles/SharedLayout.module.scss";

const SharedLayout = () => {
  return (
    <div className={styles.appContainer}>
      <header className={styles.header}>
        <h1 className={styles.siteTitle}>Movie Mosaic</h1>
        <nav>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? styles.active : "")}
          >
            Home
          </NavLink>
          <NavLink
            to="/movies"
            className={({ isActive }) => (isActive ? styles.active : "")}
          >
            Movies
          </NavLink>
        </nav>
      </header>

      <Suspense
        fallback={<div className={styles.loading}>Loading huge waves...</div>}
      >
        <Outlet />
      </Suspense>
    </div>
  );
};

export default SharedLayout;
