import styles from './Footer.module.scss';

export const Footer = () => {
  const handleBackToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
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
          onClick={handleBackToTop}
          className={styles.backToTop}
        >
          Back to top
        </button>
      </div>
    </footer>
  );
};
