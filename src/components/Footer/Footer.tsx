import { NavLink } from 'react-router-dom';
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
        {/* Logo */}
        <NavLink
          to="/"
          replace
          className={styles.logo}
          aria-label="Go to homepage"
        >
          <img src="/img/logo/Logo.png" alt="Logo" />
        </NavLink>

        {/* Navigation */}
        <nav className={styles.nav}>
          <a
            href="https://github.com/JenyBerezhna/react_phone-catalog"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.github}
          >
            GITHUB
          </a>

          <NavLink to="/contacts" className={styles.contacts}>
            CONTACTS
          </NavLink>

          <NavLink to="/rights" className={styles.rights}>
            RIGHTS
          </NavLink>
        </nav>

        {/* Back to top */}
        <button
          type="button"
          onClick={handleBackToTop}
          className={styles.backToTop}
          aria-label="Back to top"
        >
          <span className={styles.backToTopText}>Back to top</span>
          <img src="/img/icons/back-to-button.png" alt="" />
        </button>
      </div>
    </footer>
  );
};
