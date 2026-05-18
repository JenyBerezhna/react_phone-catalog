import styles from './Hero.module.scss';
import { useSlider } from '../../../../hooks/useSlider';

const images = [
  '/img/banners/banner-phones.jpg',
  '/img/banners/ipads-banner-1.avif',
  '/img/banners/banner-accessor.png',
];

export const Hero = () => {
  const { index, next, prev, goTo } = useSlider(images.length, 5000);

  return (
    <section className={styles.hero}>
      {/* Left arrow */}
      <button className={`${styles.arrow} ${styles.arrowLeft}`} onClick={prev}>
        <img src="/img/icons/arrowLeft.png" alt="Previous slide" />
      </button>

      {/* Banner image */}
      <img
        src={images[index]}
        alt={`Banner ${index + 1}`}
        className={styles.bannerImage}
      />

      {/* Right arrow */}
      <button className={`${styles.arrow} ${styles.arrowRight}`} onClick={next}>
        <img src="/img/icons/arrowRight.png" alt="Next slide" />
      </button>

      {/* Dots */}
      <div className={styles.dotsWrapper}>
        <div className={styles.dots}>
          {images.map((_, i) => (
            <button
              key={i}
              className={i === index ? styles.active : undefined}
              onClick={() => goTo(i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
