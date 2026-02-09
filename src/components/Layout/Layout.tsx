import { Outlet } from 'react-router-dom';
import { Header } from '../Header/Header';
import styles from './Layout.module.scss';

export const Layout = () => {
  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <Header />

      <main className={styles.main}>
        <Outlet />
      </main>

      <footer className={styles.footer}>
        <div className={styles.container}>
          <a
            href="https://github.com/JenyBerezhna/react_phone-catalog"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.github}
          >
            GitHub
          </a>

          <button
            type="button"
            className={styles.backToTop}
            onClick={handleBackToTop}
          >
            Back to top ↑
          </button>
        </div>
      </footer>
    </>
  );
};
