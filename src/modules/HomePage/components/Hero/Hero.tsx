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
    <>
      <div className={styles.slider}>
        <button onClick={prev}>‹</button>

        <img src={images[index]} alt="Banner" />

        <button onClick={next}>›</button>

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
    </>
  );
};
