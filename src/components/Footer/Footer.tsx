const handleBackToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
};

import styles from './Footer.module.css';

<button type="button" onClick={handleBackToTop} className={styles.backToTop}>
  Back to top
</button>;
