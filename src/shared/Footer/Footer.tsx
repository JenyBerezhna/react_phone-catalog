const handleBackToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
};

<button type="button" onClick={handleBackToTop} className={styles.backToTop}>
  Back to top
</button>;
